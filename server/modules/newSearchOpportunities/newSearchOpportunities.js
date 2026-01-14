const urls = require("./urls.json");
const {
  stringifyNotificationNewSearch,
} = require("./utils/stringifyNotificationNewSearch");
const { notification } = require("../../integrations/discord/notifier");
const { updateLastExecution } = require("./utils/updateLastExecution");
const { getAllNewProducts } = require("./utils/getAllNewProducts");
const { getLastProductCreation } = require("./utils/getLastProductCreation");
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
    const lastExecution = Number(await getLastProductCreation()) || 0;
    let searchResults = await getAllNewProducts(urls, lastExecution);
    const totalProducts = searchResults.reduce(
      (total, result) => total + result.items.length,
      0
    );
    console.log("totalProducts", totalProducts);
    const mostRecentCreationDate = searchResults.reduce((latest, result) => {
      for (const item of result.items) {
        if (item.creation_date > latest) {
          latest = item.creation_date;
        }
      }
      return latest;
    }, lastExecution);

    if (mostRecentCreationDate > lastExecution) {
      // COMENTAR PARA TESTEAR PRODUCTOS NUEVOS SIN ACTUALIZAR LASTEXECUTION
      await updateLastExecution(mostRecentCreationDate);
    }

    if (totalProducts > 0) {
      console.log("Extrayendo oportunidades...");
      opportunities = await extractOpportunities(searchResults);
      console.log("typeof opportunities", typeof opportunities);
      console.log("opportunities", opportunities);
      console.log(
        `${totalProducts} nuevos productos, de los cuales ${opportunities.length} son oportunidades.`
      );
      console.log("");
    }

    // En caso de que se hayan encontrado oportunidades:
    if (opportunities.length > 0 && opportunities.length < 20) {
      // Generar el mensaje con las oportunidades encontradas
      let msj = stringifyNotificationNewSearch(opportunities);

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
