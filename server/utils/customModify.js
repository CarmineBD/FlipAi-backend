const db = require("../db"); // Ajusta la ruta a tu archivo de conexión
const cron = require("node-cron");
const { getstate, fetchProductPage } = require("../modules/scraping/fetchPage");

const ahora = Date.now(); // Obtiene el tiempo actual en milisegundos desde el 1 de enero de 1970
const unMes = 2592000000;
const unaSemana = 604800000;
const haceUnMes = ahora - unMes;
const haceUnaSemana = ahora - unaSemana;
const haceDosMeses = ahora - 2592000000 * 2;

async function modify() {
  console.log(" [ EJECUTANDO LA FUNCIÓN CUSTOM ] ");

  // Primero se sescanenan todos los productos del mes para comprobar si se han vendido o no
  await changeStates();
  console.log("chequeo de los productos del mes completado exitosamente");
}

// Cambia todos los "disponibles" de las oportunidades que tienen más de una semana por un "disponible por mucho tiempo"
async function changeStates() {
  db.query(
    `SELECT * FROM products WHERE w_sub_category = 'Teléfonos móviles' ORDER BY reserved_date DESC`,
    (error, results, fields) => {
      if (error) throw error;

      // Recorrer c                                                                                                                                          elemento y modificar la columna "date_sold"
      results.forEach((element) => {
        const updateQuery = `UPDATE products SET w_sub_category = 'Smartphone' WHERE id = ${element.id}`;
        db.query(updateQuery, (updateError, updateResults, updateFields) => {
          if (updateError) throw updateError;
          console.log(`Elemento actualizado con éxito: ${element.id}`);
        });
        console.log(element.title);
      });
    }
  );
}

module.exports = {
  modify,
};
