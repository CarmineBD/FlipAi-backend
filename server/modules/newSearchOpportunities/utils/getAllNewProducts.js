const { fetchNewProducts } = require("./fetchNewProducts");
const { formatProducts } = require("./formatProducts");

async function getAllNewProducts(urlList = urls) {
  console.log("getAllNewProducts");
  // Obtener todos los productos nuevos
  const wrappedResults = [];
  let totalProducts = 0;

  for (const { url, category } of urlList) {
    const newProducts = await fetchNewProducts(url);
    const formattedProducts = await formatProducts(newProducts);

    wrappedResults.push({
      source: {
        category,
        url,
      },
      items: formattedProducts,
    });
    totalProducts += formattedProducts.length;
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
