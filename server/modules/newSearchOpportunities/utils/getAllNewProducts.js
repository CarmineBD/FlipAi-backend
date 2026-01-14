const { fetchNewProducts } = require("./fetchNewProducts");
const { formatProducts } = require("./formatProducts");
async function getAllNewProducts(urlList = urls, lastExecution) {
  console.log("getAllNewProducts");
  // Obtener todos los productos nuevos
  const wrappedResults = [];
  let totalProducts = 0;
  const cutoff = Number.isFinite(lastExecution) ? lastExecution : 0;
  console.log("lastProductCreation", cutoff);

  for (const { url, category } of urlList) {
    const newProducts = await fetchNewProducts(url, cutoff);
    const formattedProducts = await formatProducts(newProducts);
    const filteredProducts = formattedProducts.filter(
      (product) => product.creation_date > cutoff
    );

    wrappedResults.push({
      source: {
        category,
        url,
      },
      items: filteredProducts,
    });
    totalProducts += filteredProducts.length;
  }

  console.log(totalProducts + " productos nuevos encontrados.");

  // ACTUALIZA LA ULTIMA EJECUCION
  const firstProduct = wrappedResults.find((result) => result.items.length > 0)
    ?.items[0];
  console.log("titulo del ultimo producto publicado: " + firstProduct?.title);
  // await updateLastExecution(firstProduct?.created_at);

  return wrappedResults;
}

module.exports = {
  getAllNewProducts,
};
