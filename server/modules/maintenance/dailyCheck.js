const db = require('../../db'); // Ajusta la ruta a tu archivo de conexión
const cron = require('node-cron');
const { getstate, fetchProductPage } = require('../scraping/fetchPage');

const ahora = Date.now(); // Obtiene el tiempo actual en milisegundos desde el 1 de enero de 1970
const unMes = 2592000000
const unaSemana = 604800000
const haceUnMes = ahora - unMes
const haceUnaSemana = ahora - unaSemana
const haceDosMeses = ahora - (2592000000 * 2);

// Cambia todos los "reservados" que tienen más de un mes por un "reservado por mucho tiempo"
async function setOldReserveds() {

    db.query(`SELECT * FROM products WHERE reserved_date < ${haceUnMes} AND article_status = 'reservado' ORDER BY reserved_date DESC`, (error, results, fields) => {
        if (error) throw error;

        // Recorrer cada elemento y modificar la columna "date_sold"
        results.forEach((element) => {
            const updateQuery = `UPDATE products SET article_status = 'reservado por mucho tiempo' WHERE id = ${element.id}`;
            db.query(updateQuery, (updateError, updateResults, updateFields) => {
                if (updateError) throw updateError;
                console.log(`Elemento actualizado con éxito: ${element.id}`);
            });
        });
    })
}

// Función para chequear si se han vendido o borrado los productos de los últimos 30 días
async function checkMonthSales() {
    let contador = 0
    let borrados = 0
    let reservados = 0
    let vendidos = 0
    let reservadosBorrados = 0
    let vendidosBorrados = 0

    db.query(`SELECT * FROM products WHERE reserved_date > ${haceUnMes} AND article_status = 'reservado' ORDER BY reserved_date DESC`, async (error, results, fields) => {
        if (error) throw error;

        for (const element of results) {
            try {
                let elemento = await fetchProductPage(element.article_url);

                elemento.article_status == 'reservado' ? reservados++ : vendidos++

                let state = getstate(elemento.w_state)

                let updateQuery =
                    `UPDATE products SET ` +
                    `article_status = '${elemento.article_status}'` +
                    `, sale_date = ${elemento.sale_date}` +
                    `, manual_confirmed = 'sin chequear'`

                // if (state != null) {
                //     updateQuery += `, state = '${state}'`
                // }

                updateQuery += ` WHERE id = ${element.id}`

                db.query(updateQuery, (updateError, updateResults, updateFields) => {
                    if (updateError) throw updateError;
                    console.log(`Elemento número ${contador} actualizado con éxito: ${element.title}`);
                });
            } catch (error) {
                // console.log(error)
                // suma el contador de borrados
                borrados++

                // inicializar la query
                let updateQuery = ''

                if (element.article_status == 'reservado') {
                    reservadosBorrados++
                    updateQuery = `UPDATE products SET manual_confirmed = 'borrado', article_status = 'reservado_borrado' WHERE id = ${element.id}`;
                } else if (element.article_status == 'vendido') {
                    vendidosBorrados++
                    updateQuery = `UPDATE products SET manual_confirmed = 'borrado', article_status = 'vendido_borrado' WHERE id = ${element.id}`;
                } else {
                    updateQuery = `UPDATE products SET manual_confirmed = 'borrado', article_status = 'borrado' WHERE id = ${element.id}`;
                }


                db.query(updateQuery, (updateError, updateResults, updateFields) => {
                    if (updateError) throw updateError;
                    console.log(`Elemento número ${contador} borrado con éxito: ${element.title}`);
                });
            }
            contador++
        }
        console.log('actualizados: ' + contador + ' productos')
        console.log('de los cuales: ' + borrados + ' han sido borrados')
        console.log(reservados + ' siguen reservados')
        console.log(vendidos + ' vendidos confirmados')
        console.log(reservadosBorrados + ' reservados-borrados confirmados')
        console.log(vendidosBorrados + ' vendidos-borrados confirmados')
    })
}

// Función para eliminar los productos des-reservados
async function deleteUnreserveds() {
    db.query(`DELETE FROM products WHERE WHERE article_status = 'des-reservado' `, async (error, results, fields) => {
        if (error) throw error;
    })
}

// Función para chequear si se han vendido o borrado los productos antiguos de más de 30 días
async function checkOldSales() {
    let contador = 0
    let borrados = 0
    let reservados = 0
    let vendidos = 0
    let reservadosBorrados = 0
    let vendidosBorrados = 0

    db.query(`SELECT * FROM products WHERE reserved_date < ${haceUnMes} AND article_status = 'reservado por mucho tiempo' ORDER BY reserved_date DESC`, async (error, results, fields) => {
        if (error) throw error;

        for (const element of results) {
            try {
                let elemento = await fetchProductPage(element.article_url);

                elemento.article_status == 'reservado' ? reservados++ : vendidos++

                if (elemento.article_status == 'vendido') {
                    let updateQuery =
                        `UPDATE products SET ` +
                        `article_status = 'vendido despues de mucho tiempo'` +
                        `, sale_date = ${elemento.sale_date}`

                    updateQuery += ` WHERE id = ${element.id}`

                    db.query(updateQuery, (updateError, updateResults, updateFields) => {
                        if (updateError) throw updateError;
                        console.log(`Elemento número ${contador} actualizado con éxito: ${element.title}`);
                    });
                }


            } catch (error) {
                // suma el contador de borrados
                borrados++

                // inicializar la query
                let updateQuery = ''

                if (element.article_status == 'reservado') {
                    reservadosBorrados++
                    updateQuery = `UPDATE products SET manual_confirmed = 'borrado', article_status = 'reservado por mucho tiempo_borrado' WHERE id = ${element.id}`;
                } else if (element.article_status == 'vendido') {
                    vendidosBorrados++
                    updateQuery = `UPDATE products SET manual_confirmed = 'borrado', article_status = 'vendido despues de mucho tiempo_borrado' WHERE id = ${element.id}`;
                } else {
                    updateQuery = `UPDATE products SET manual_confirmed = 'borrado', article_status = 'borrado' WHERE id = ${element.id}`;
                }

                db.query(updateQuery, (updateError, updateResults, updateFields) => {
                    if (updateError) throw updateError;
                    console.log(`Elemento número ${contador} borrado con éxito: ${element.title}`);
                });
            }
            contador++
        }
        console.log('actualizados: ' + contador + ' productos')
        console.log('de los cuales: ' + borrados + ' han sido borrados')
        console.log(reservados + ' siguen reservados')
        console.log(vendidos + ' vendidos confirmados')
        console.log(reservadosBorrados + ' reservados-borrados confirmados')
        console.log(vendidosBorrados + ' vendidos-borrados confirmados')
    })
}

// Función para eliminar los productos que llevan más de 2 meses reservado sin vender
async function deleteOldReserveds() {
    db.query(`DELETE FROM products WHERE reserved_date < ${haceDosMeses} AND article_status = 'reservado por mucho tiempo' ORDER BY reserved_date DESC`, async (error, results, fields) => {
        if (error) throw error;
    })
}



async function dailyCheck() {
    console.log(' [ COMENZANDO EL ESCANEO DIARIO ] ')

    // Primero se sescanenan todos los productos del mes para comprobar si se han vendido o no
    await checkMonthSales()
    console.log('chequeo de los productos del mes completado exitosamente')

    // // DE MOMENTO ESTO NO, YA QUE LOS NECESITO PARA ENTRENAR LA IA
    // // Luego se eliminan todos aquellos productos que hayan sido des-reservados
    // // await deleteUnreserveds()

    // // Luego cambio todos los "reserveds" de más de un mes por "reservado por mucho tiempo"
    await setOldReserveds()
    console.log('establecidos todos los "reservado por mucho tiempo" exitosamente')

    // // Luego chequeo si los "reservado por mucho tiempo" han sido vendidos para cambiarlos por "vendido después de mucho tiempo"
    await checkOldSales()
    console.log('chequeo de todos los "reservado por mucho tiempo" completado exitosamente')

    // // Luego elimino los "reservado por mucho tiempo" de más de 2 meses
    // // await deleteOldReserveds()

    // Chequea si ha habido algún cambio en las oportunidades
    await checkOpportunities()


}


























// TEMAS DE BASE DE DATOS DE OPORTUNIDADES




// Función para chequear si se han vendido o borrado las oportunidades en la última semana
async function checkWeekOpportunities() {
    let contador = 0
    let borrados = 0
    let reservados = 0
    let vendidos = 0
    let reservadosBorrados = 0
    let vendidosBorrados = 0

    db.query(`SELECT * FROM opportunities WHERE creation_date > ${haceUnaSemana} ORDER BY creation_date DESC`, async (error, results, fields) => {
        if (error) throw error;

        for (const element of results) {
            try {
                let elemento = await fetchProductPage(element.article_url);
                let updateQuery = ''

                if (elemento.article_status == 'des-reservado') {
                    updateQuery +=
                        `UPDATE opportunities SET ` +
                        `article_status = 'disponible'` +
                        `, manual_confirmed = 'sin chequear'`
                }

                if (elemento.article_status == 'reservado') {
                    updateQuery +=
                        `UPDATE opportunities SET ` +
                        `article_status = 'reservado'` +
                        `, reserved_date = ${elemento.last_modification}` +
                        `, manual_confirmed = 'sin chequear'`
                }

                if (elemento.article_status == 'vendido') {
                    updateQuery +=
                        `UPDATE opportunities SET ` +
                        `article_status = 'vendido'` +
                        `, sale_date = ${elemento.last_modification}` +
                        `, manual_confirmed = 'sin chequear'`
                }

                updateQuery += ` WHERE id = ${element.id}`

                db.query(updateQuery, (updateError, updateResults, updateFields) => {
                    if (updateError) throw updateError;
                    console.log(`Elemento número ${contador} actualizado con éxito: ${element.title}`);
                });
            } catch (error) {

                // // console.log(error)
                // // suma el contador de borrados
                borrados++

                // inicializar la query
                let updateQuery = ''

                if (element.article_status == 'reservado') {
                    reservadosBorrados++
                    updateQuery = `UPDATE opportunities SET manual_confirmed = 'borrado', article_status = 'reservado_borrado' WHERE id = ${element.id}`;
                } else if (element.article_status == 'vendido') {
                    vendidosBorrados++
                    updateQuery = `UPDATE opportunities SET manual_confirmed = 'borrado', article_status = 'vendido_borrado' WHERE id = ${element.id}`;
                } else {
                    updateQuery = `UPDATE opportunities SET manual_confirmed = 'borrado', article_status = 'borrado' WHERE id = ${element.id}`;
                }


                db.query(updateQuery, (updateError, updateResults, updateFields) => {
                    if (updateError) throw updateError;
                    console.log(`Elemento número ${contador} borrado con éxito: ${element.title}`);
                });
            }
            contador++
        }
        console.log('actualizados: ' + contador + ' productos')
        console.log('de los cuales: ' + borrados + ' han sido borrados')
        console.log(reservados + ' siguen reservados')
        console.log(vendidos + ' vendidos confirmados')
        console.log(reservadosBorrados + ' reservados-borrados confirmados')
        console.log(vendidosBorrados + ' vendidos-borrados confirmados')
    })
}


// Cambia todos los "disponibles" de las oportunidades que tienen más de una semana por un "disponible por mucho tiempo"
async function setOldOpportunities() {

    db.query(`SELECT * FROM opportunities WHERE creation_date < ${haceUnaSemana} AND article_status = 'disponible' ORDER BY creation_date DESC`, (error, results, fields) => {
        if (error) throw error;

        // Recorrer cada elemento y modificar la columna "date_sold"
        results.forEach((element) => {
            const updateQuery = `UPDATE opportunities SET article_status = 'disponible por mucho tiempo' WHERE id = ${element.id}`;
            db.query(updateQuery, (updateError, updateResults, updateFields) => {
                if (updateError) throw updateError;
                console.log(`Elemento actualizado con éxito: ${element.id}`);
            });
        });
    })
}

async function checkOpportunities() {

    await checkWeekOpportunities()

    await setOldOpportunities()

}





module.exports = {
    dailyCheck,
    checkOpportunities,

};
