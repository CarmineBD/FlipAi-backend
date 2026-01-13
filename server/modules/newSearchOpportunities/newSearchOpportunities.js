const urls = require("./urls.json");
const { getAllNewProducts } = require("./utils/getAllNewProducts");
const { extractOpportunities } = require("./utils/extractOpportunities");

// Bǧsqueda general de todas las urls
async function newSearchOpportunities() {
  console.log("");
  console.log("=============================");
  console.log(" INICIO ESCANEO OPORTUNIDADES V-2.0");
  console.log("=============================");
  console.log("");

  try {
    let allNewProducts = [];
    let opportunities = [];

    console.log("Obteniendo todos los nuevos productos...");
    let newProducts = await getAllNewProducts(urls);
    allNewProducts = allNewProducts.concat(newProducts);
    console.log("allNewProducts.length", allNewProducts?.length);

    if (allNewProducts.length > 0) {
      console.log("Extrayendo oportunidades...");
      opportunities = await extractOpportunities(allNewProducts);
      console.log("");
      console.log(
        `${allNewProducts.length} nuevos productos, de los cuales ${opportunities.length} son oportunidades.`
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
