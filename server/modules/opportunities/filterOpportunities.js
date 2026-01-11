const { detectOpportunity } = require("./detectOpportunity");

async function filterOpportunities(products) {
  // for (let elemento in products) {
  //     console.log(products[elemento].title);
  // }

  console.log(
    "dentro de filterOpportunities, typeof products:",
    typeof products
  );
  console.log("dentro de filterOpportunities, products:", products);

  let resultado = [];

  const promises = products.map((product) => detectOpportunity(product));
  console.log(1);
  resultado = await Promise.all(promises);

  // Limpio los resultados eliminando todos los objetos null
  let nuevoArray = resultado.filter((objeto) => objeto !== null);

  return nuevoArray;

  // nuevoArray.forEach(opportunity => {
  //     console.log(opportunity.article_url);
  // });
}

module.exports = {
  filterOpportunities,
};
