const { getCategoryFilter } = require("../../filters");
const { fillCustomFieldsWithAI } = require("./fillCustomFieldsWithAI");

async function extractOpportunities(searchResults) {
  console.log("extractOpportunities ejecutado");
  // console.log("searchResults", JSON.stringify(searchResults.slice(0, 2)));
  let filteredOutCount = 0;

  // Iterar sobre los resultados de busqueda
  for (const { source, items } of searchResults) {
    const category = source?.category ?? "sin_categoria";
    const basicFilter = getCategoryFilter(category);
    for (const item of items) {
      // Paso 0: Aplicar filtros basicos segun categoria para evitar llamadas innecesarias a la IA, por ejemplo: precio maximo, palabras prohibidas, etc.
      if (!basicFilter({ item, source, category })) {
        filteredOutCount += 1;
        continue;
      }

      console.log(`${item.title} (${category})`);
      // Paso 1: llama a la IA con el prompt segun la categoria
      let normalized_item = await fillCustomFieldsWithAI({ item, category });

      console.log("item despues de fillCustomFieldsWithAI:", normalized_item);

      // Paso 2: Busca rules de categoria segun SKU

      // Paso 4: Ejecuta la logica por cada SKU encontrada

      // Paso 5: Si hay oportunidades, se guarda en un array para devolverla
    }
  }

  console.log(
    `Total productos eliminados por filtros basicos: ${filteredOutCount}`
  );

  return {};
}
module.exports = {
  extractOpportunities,
};
