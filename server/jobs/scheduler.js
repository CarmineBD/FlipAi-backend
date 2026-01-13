const cron = require("node-cron");
const { searchReserveds } = require("../modules/reserveds/searchReserveds");
const { dailyCheck } = require("../modules/maintenance/dailyCheck");
const {
  searchOpportunities,
} = require("../modules/opportunities/customOpportunityChecker");
const {
  newSearchOpportunities,
} = require("../modules/newSearchOpportunities/newSearchOpportunities");
const { reservedUrls } = require("../config/watchlist");

function runAndSchedule(fn, interval) {
  fn(); // Ejecutar la funcion una vez al inicio
  setInterval(fn, interval); // Programar la ejecucion repetida
}

function startScheduler() {
  // Busqueda de reservados
  setInterval(() => {
    searchReserveds(reservedUrls)
      .then(() => console.log("Búsqueda ejecutada correctamente."))
      .catch((error) => console.error("Error al ejecutar la búsqueda:", error));
  }, 1200000); // Ejecutar cada 20 minutos (1,200,000 milisegundos)

  // // Busqueda de oportunidades
  // runAndSchedule(() => {
  //   searchOpportunities()
  //     .then(() => console.log("Búsqueda ejecutada correctamente."))
  //     .catch((error) => console.error("Error al ejecutar la búsqueda:", error));
  // }, 600000); // Ejecutar cada 2 minutos (120,000 milisegundos)

  runAndSchedule(() => {
    newSearchOpportunities()
      .then(() => console.log("Búsqueda ejecutada correctamente."))
      .catch((error) => console.error("Error al ejecutar la búsqueda:", error));
  }, 600000); // Ejecutar cada 2 minutos (120,000 milisegundos)

  // ejecutar el chequeo diario a las 3:00 am (mm hh)
  cron.schedule("00 3 * * *", dailyCheck);
}

module.exports = {
  startScheduler,
};
