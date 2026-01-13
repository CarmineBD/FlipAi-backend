const urls = require("./urls.json");
const { getAllNewProducts } = require("./utils/getAllNewProducts");
const {
  extractOpportunities,
} = require("./utils/extractOpportunities/extractOpportunities");

// Bǧsqueda general de todas las urls
async function newSearchOpportunities() {
  console.log("");
  console.log("=============================");
  console.log(" INICIO ESCANEO OPORTUNIDADES V-2.0");
  console.log("=============================");
  console.log("");

  try {
    let opportunities = [];

    console.log("Obteniendo todos los nuevos productos...");
    let searchResults = await getAllNewProducts(urls);
    const totalProducts = searchResults.reduce(
      (total, result) => total + result.items.length,
      0
    );
    console.log("totalProducts", totalProducts);

    if (totalProducts > 0) {
      console.log("Extrayendo oportunidades...");
      opportunities = await extractOpportunities(searchResults);
      console.log("");
      console.log(
        `${totalProducts} nuevos productos, de los cuales ${opportunities.length} son oportunidades.`
      );
      console.log("");
    }

    // En caso de que se hayan encontrado oportunidades:
    if (opportunities.length > 0 && opportunities.length < 20) {
      // Generar el mensaje con las oportunidades encontradas
      let msj = stringifyNotification(opportunities);

      // Mandar la notificación en discord
      notification(msj);
      console.log("Mensaje de discord enviado");
    }

    console.log("");
    console.log("=========================");
    console.log("FIN ESCANEO OPORTUNIDADES V-2.0");
    console.log("=========================");
    console.log("");
  } catch (error) {
    console.error("Error al obtener los nuevos productos:", error);
  }
}

module.exports = {
  newSearchOpportunities,
};
