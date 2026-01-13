const connection = require("../../../db");

// Funci?n para obtener el last execution de mi base de datos
async function getLastProductCreation() {
  console.log("getLastProductCreation ejecutado");
  const consulta = "SELECT last_execution from code_executions WHERE id = 1";

  return new Promise((resolve, reject) => {
    connection.query(consulta, (error, resultados) => {
      if (error) {
        reject(error);
      } else {
        resolve(resultados[0].last_execution);
      }
    });
  });
}

module.exports = {
  getLastProductCreation,
};
