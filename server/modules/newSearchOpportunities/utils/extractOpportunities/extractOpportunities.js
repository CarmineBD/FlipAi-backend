const { getCategoryFilter } = require("../../filters");

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

      // Paso 2: Define el SKU segun categoria

      // Paso 3: Busca rules de categoria segun SKU

      // Paso 4: Ejecuta la logica por cada SKU encontrada
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
