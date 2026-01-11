const connection = require("../../db");

async function updateLastExecution(date) {
  const updateQuery = `UPDATE code_executions SET last_execution = ${date} WHERE id = 1`;
  return new Promise((resolve, reject) => {
    connection.query(updateQuery, (err) => {
      if (err) return reject(err);
      console.log(
        `Actualizado correctamente el lastExecution de searchOpportunities por: ${date}`
      );
      resolve();
    });
  });
}

module.exports = {
  updateLastExecution,
};
