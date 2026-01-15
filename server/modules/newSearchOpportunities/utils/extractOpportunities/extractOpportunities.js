const { getCategoryFilter } = require("../../filters");
const { fillCustomFieldsWithAI } = require("./fillCustomFieldsWithAI");
const { evaluate } = require("./ruleEngine");
const { getRulesByCategory } = require("../../deals_rules");

async function extractOpportunities(searchResults) {
  console.log("extractOpportunities ejecutado");
  // console.log("searchResults", JSON.stringify(searchResults.slice(0, 2)));
  let filteredOutCount = 0;
  const opportunities = [];

  // Iterar sobre los resultados de busqueda
  for (const { source, items } of searchResults) {
    const category = source?.category ?? "sin_categoria";
    const basicFilter = getCategoryFilter(category);
    const rulesByKey = getRulesByCategory(category);
    for (const item of items) {
      // Paso 0: Aplicar filtros basicos segun categoria para evitar llamadas innecesarias a la IA, por ejemplo: precio maximo, palabras prohibidas, etc.
      if (!basicFilter({ item, source, category })) {
        filteredOutCount += 1;
        continue;
      }

      // Paso 1: llama a la IA con el prompt segun la categoria
      const enrichedItem = await fillCustomFieldsWithAI({ item, category });

      // Si no hay key/custom, saltar
      if (!enrichedItem.ai_fields.parsed || !enrichedItem.key) continue;

      if (!enrichedItem.ai_fields.parsed.is_target_listing) {
        continue;
      }

      // 2) evaluar reglas
      const res = evaluate(enrichedItem, rulesByKey);

      // 3) si es deal, guardarlo
      if (res.isDeal) {
        opportunities.push({
          category,
          key: res.key,
          item: enrichedItem,
          matches: res.matches,
        });
      }

      // Paso 2: Busca rules de categoria segun SKU

      // Paso 4: Ejecuta la logica por cada SKU encontrada

      // Paso 5: Si hay oportunidades, se guarda en un array para devolverla
    }
  }

  console.log(`Total eliminados por filtros básicos: ${filteredOutCount}`);
  console.log(`Total oportunidades: ${opportunities.length}`);

  return opportunities;
}
module.exports = {
  extractOpportunities,
};
