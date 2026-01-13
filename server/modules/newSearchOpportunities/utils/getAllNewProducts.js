const { fetchNewProducts } = require("./fetchNewProducts");
const { formatProducts } = require("./formatProducts");
const {
  removeDuplicateProducts,
} = require("../../../utils/removeDuplicateProducts");

async function getAllNewProducts(urlList = urls) {
  console.log("getAllNewProducts");
  // Obtener todos los prouctos nuevos
  let allNewProducts = [];
  for (const { url } of urlList) {
    const newProducts = await fetchNewProducts(url);
    allNewProducts = allNewProducts.concat(newProducts);
  }

  console.log(allNewProducts.length + " productos nuevos encontrados.");

  // ELIMINA DUPLICADOS Eliminar repetidos en caso de que haya un producto duplicado para prevenir
  allNewProducts = removeDuplicateProducts(allNewProducts);

  // ACTUALIZA LA ÚLTIMA EJECUCIÓN
  console.log(
    "título del último producto publicado: " + allNewProducts[0]?.title
  );
  // await updateLastExecution(allNewProducts[0].created_at);

  // FORMATEA Dar el formato personalizado al los productos
  return (allNewProducts = await formatProducts(allNewProducts));
}

module.exports = {
  getAllNewProducts,
};
