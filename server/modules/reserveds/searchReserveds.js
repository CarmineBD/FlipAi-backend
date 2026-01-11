const connection = require('../../db'); // Ajusta la ruta a tu archivo de conexión
const { fetchUrl } = require('../wallapop/client');
const { getstate, fetchProductPage } = require('../scraping/fetchPage');
// const https = require('https');
// const fetch = require('node-fetch');

const axios = require('axios');
const cheerio = require('cheerio');
// const db = require('../db');

// Búsqueda general de todas las urls
async function searchReserveds(urls) {

    console.log('');
    console.log('===================================');
    console.log('INICIO ESCANEO PRODUCTOS RESERVADOS');
    console.log('===================================');
    console.log('')

    let allReservedProducts = [];
    try {

        // Obtener todos los reservados de todas las urls
        for (const url of urls) {
            // console.log(`Escaneando URL: ${url}`);
            const reservedItems = await fetchReservedItems(url);
            allReservedProducts = allReservedProducts.concat(reservedItems);
        }

        // COMPRUEBA MODELO DE DATOS Chequea si el modelo de datos ha cambiado
        checkIfDataModelChanged(allReservedProducts[0]);

        // ELIMINA DUPLICADOS Eliminar repetidos en caso de que haya un producto duplicado para prevenir
        allReservedProducts = removeDuplicates(allReservedProducts);

        // FORMATEA Dar el formato personalizado al los productos
        allReservedProducts = await formatProducts(allReservedProducts)


        // UPLOAD Subir productos a la base de datos
        uploadProducts(allReservedProducts);

        console.log('');
        console.log('================================');
        console.log('FIN ESCANEO PRODUCTOS RESERVADOS');
        console.log('================================');
        console.log('')

        console.log('Total de productos reservados obtenidos: ', allReservedProducts.length);

    } catch (error) {
        console.error('Error al obtener productos reservados:', error);
    }


}

// retorna todos los reservados obtenidos de una URL iterada
async function fetchReservedItems(url) {
    let reservedItems = [];
    let currentUrl = url;

    // Para mostrar la category_id en el mensaje de carga de la consola
    let regex = /[?&]category_id=(\d+)/;
    let categoryIdMatch = url.match(regex);
    let categoryId = categoryIdMatch ? categoryIdMatch[1] : 'desconocido';  // Maneja el caso donde no se encuentra category_id

    // Loop que solo para hasta que no hayan páginas nuevas
    while (currentUrl) {

        try {
            // Guarda solo aquellos productos que estén reservados
            const data = await fetchUrl(currentUrl);
            const items = data.data.section.payload.items;
            const reserved = items.filter(item => item.reserved && item.reserved.flag);
            reservedItems = reservedItems.concat(reserved);

            // Mensaje de carga de la consola
            process.stdout.write(`\r${reservedItems.length} Productos reservados obtenidos en la categoría con id: ${categoryId}`);

            // Chequea si esxisten nuevas páginas para saber si seguir con el loop o no
            if (data.meta.next_page) {
                currentUrl = `https://api.wallapop.com/api/v3/search?next_page=${data.meta.next_page}`;
            } else {
                // Console.log para hacer un salto de línea entre mensajes y evitar errores en el mensaje
                console.log('');
                break;
            }
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
            break;
        }

    }
    return reservedItems;  // Return the reserved items
}

// Chequea si el modelo de datos de Wallapop ha cambiado
function checkIfDataModelChanged(item) {
    const expectedModel = {
        id: "string",
        user_id: "string",
        title: "string",
        description: "string",
        category_id: "number",
        price: {
            amount: "number",
            currency: "string"
        },
        images: [{
            average_color: "string",
            urls: {
                small: "string",
                medium: "string",
                big: "string"
            }
        }],
        reserved: {
            flag: "boolean"
        },
        location: {
            latitude: "number",
            longitude: "number",
            postal_code: "string",
            city: "string",
            region: "string",
            region2: "string",
            country_code: "string"
        },
        shipping: {
            item_is_shippable: "boolean",
            user_allows_shipping: "boolean"
        },
        favorited: {
            flag: "boolean"
        },
        bump: {
            type: "string"
        },
        web_slug: "string",
        created_at: "number",
        modified_at: "number",
        taxonomy: [{
            id: "number",
            name: "string",
            icon: "string"
        }],
        is_favoriteable: {
            flag: "boolean"
        },
        is_refurbished: {
            flag: "boolean"
        }
    };

    function checkProperties(expected, actual, path = '') {
        for (const key in expected) {
            if (expected.hasOwnProperty(key)) {
                const currentPath = path ? `${path}.${key}` : key;

                if (typeof expected[key] === 'object' && !Array.isArray(expected[key])) {
                    if (!actual.hasOwnProperty(key) || typeof actual[key] !== 'object') {
                        throw new Error(`El campo '${currentPath}' está faltando o no es un objeto.`);
                    }
                    checkProperties(expected[key], actual[key], currentPath);
                } else if (Array.isArray(expected[key])) {
                    if (!Array.isArray(actual[key])) {
                        throw new Error(`El campo '${currentPath}' está faltando o no es un array.`);
                    }
                    if (expected[key].length > 0 && actual[key].length > 0) {
                        checkProperties(expected[key][0], actual[key][0], currentPath);
                    }
                } else if (typeof actual[key] !== expected[key]) {
                    throw new Error(`El campo '${currentPath}' tiene el tipo '${typeof actual[key]}', se esperaba '${expected[key]}'.`);
                }
            }
        }
    }

    try {
        checkProperties(expectedModel, item);
        console.log('El modelo de datos es consistente.');
    } catch (error) {
        console.error('⚠️ Cambio en el modelo de datos detectado:', error.message);
        throw error; // Lanza el error para detener el programa
    }
}

// Eliminar duplicados en caso de que se haya colado alguno
function removeDuplicates(items) {
    const uniqueItems = [];
    const itemIds = new Set();
    let duplicatesCount = 0;

    for (const item of items) {
        if (!itemIds.has(item.id)) {
            uniqueItems.push(item);
            itemIds.add(item.id);
        } else {
            duplicatesCount++;
        }
    }

    console.log(`Productos duplicados eliminados: ${duplicatesCount}`);
    return uniqueItems;
}

//  Funcion para rellenar campos extras en los productos haciendo fetch a su pagina principal uno a uno
async function fillExtraDataProducts(results) {
    const total = results.length;
    let count = 0;

    for (const element of results) {
        try {
            let elemento = await fetchProductPage(element.article_url);

            let state = getstate(elemento.w_state)

            element.article_status = elemento.article_status;
            element.w_brand = elemento.w_brand;
            element.w_model = elemento.w_model;
            element.w_sub_category = elemento.w_sub_category;
            element.w_sub_sub_category = elemento.w_sub_sub_category;
            element.views = elemento.views;
            element.favorites = elemento.favorites;
            element.sale_date = elemento.sale_date;

            if (state != null) {
                element.state = state;
            }

            // Incrementa el contador y muestra el estado de carga
            count++;
            process.stdout.write(`\r Rellenando campos extras a los productos obtenidos ${count}/${total}`);

        } catch (error) {
            // En caso poco probable de que se haya eliminado el producto segundos después de haberse reservado
            results = results.filter(item => item !== element);
        }
    }

    console.log('\nCampos rellenados correctamente');
    return results;
}

// Función para insertar los productos en la base de datos
function uploadProducts(products) {
    // Consulta los "article_id" existentes en la tabla
    connection.query('SELECT article_id FROM products', async (err, results) => {
        if (err) {
            console.error('Error al consultar los "article_id" existentes:', err);
            return;
        }

        // Crea un conjunto de "article_id" existentes para facilitar la verificación
        const existingArticleIds = new Set(results.map((row) => row.article_id));

        // Filtra los productos que no tienen un "article_id" existente
        let newProducts = products.filter((product) => !existingArticleIds.has(product.article_id));

        newProducts = await fillExtraDataProducts(newProducts)
        // console.log(newProducts)
        // console.log(newProducts)

        // IMPORNTANTE, que vaya después de haber ejecutado fillExtraDataProducts que borra los articulos bugeados, si no hay nuevos productos para insertar, finaliza la función
        if (newProducts.length === 0) {
            console.log('No hay nuevos productos para insertar.');
            return;
        }


        // Inserta los nuevos productos en la base de datos
        const sql = 'INSERT INTO products (article_id, category_id, time_to_sell, price, title, description, state, images, creation_date, distance, postal_code, article_url, city, user_id, allows_shipping, free_shipping, reserved_date, article_status, w_brand, w_model, w_state, w_sub_category, w_sub_sub_category, views, favorites, sale_date) VALUES ?';
        const values = newProducts.map((product) => [
            product.article_id,
            product.category_id,
            product.time_to_sell,
            product.price,
            product.title,
            product.description,
            product.state,
            product.images,
            product.creation_date,
            product.distance,
            product.postal_code,
            product.article_url,
            product.city,
            product.user_id,
            product.allows_shipping,
            product.free_shipping,
            product.reserved_date,
            product.article_status,
            product.w_brand,
            product.w_model,
            product.w_state,
            product.w_sub_category,
            product.w_sub_sub_category,
            product.views,
            product.favorites,
            product.sale_date,
        ]);

        connection.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error al insertar los productos:', err);
            } else {
                console.log('Productos insertados correctamente: \n', result);
                console.log(sql)
            }
        });
    });
}

// Formatear productos
function formatProducts(array) {
    return array.map((product) => {
        return {
            article_id: product.id,
            category_id: product.category_id,
            // sub_category_id: getProductSubCategory(product),
            // sub_sub_category_id: getProductSubSubCategory(product),
            time_to_sell: (product.modified_at) - (product.created_at),
            // product_type: getProductType(product),
            price: product.price.amount,
            title: product.title,
            description: product.description,
            // state: product.state,
            // real_state: getProductRealState(product),
            images: JSON.stringify(product.images.map(imagen => imagen.urls.big)),
            creation_date: product.created_at,
            distance: product.distance,
            postal_code: product.location.postal_code,
            user_id: product.user_id,
            allows_shipping: product.shipping.user_allows_shipping,
            free_shipping: product.free_shipping,
            article_url: "https://es.wallapop.com/item/" + product.web_slug,
            city: product.location.city,
            reserved_date: product.modified_at,

        };
    });
}






















// VERSIÓN ANTIGUA

// async function fetchTest(url) {
//     let totalResults = 0;
//     let totalPrices = 0;
//     let results = [];
//     let newResults = true;

//     while (newResults) {
//         let newUrl = url + "&start=" + totalResults;

//         try {
//             const response = await new Promise((resolve, reject) => {
//                 https.get(newUrl, resolve).on('error', reject);
//             });

//             let data = '';

//             response.on('data', (chunk) => {
//                 data += chunk;
//             });

//             await new Promise((resolve) => {
//                 response.on('end', resolve);
//             });

//             const parsedData = JSON.parse(data);

//             var products = parsedData.search_objects;
//             var filteredProducts = products.filter(function (product) {
//                 totalPrices += product.price;
//                 return product.flags.reserved === true;
//             });

//             totalResults = totalResults + Number(products.length);
//             results = results.concat(filteredProducts);

//             if (products.length === 0) {
//                 newResults = false;
//             }
//         } catch (error) {
//             console.error('Error al obtener datos de la API:', error);
//             newResults = false; // Detener el bucle en caso de error
//         }
//     }

//     console.log('')
//     console.log(results.length + " de " + totalResults + " (" + (results.length * 100 / totalResults).toFixed(2) + "%) reservados buscando '" + getNameByUrl(url) + "' en la categoría '" + getCategoryNameByUrl(url) + "'");
//     console.log("volumen de ventas: " + (calcularSumaTotalPrecios(results)).toFixed(2) + "€, precio promedio publicación: " + (totalPrices / totalResults).toFixed(2) + "€, precio promedio reservados: " + (calcularSumaTotalPrecios(results) / results.length).toFixed(2) + "€. buscando '" + getNameByUrl(url) + "' en la categoría '" + getCategoryNameByUrl(url) + "'");
//     if (url.includes("object_type_ids")) {
//         console.log("buscándolo con subcategorías");
//     }
//     if (!url.includes("category_ids")) {
//         console.log("buscandolo sin categoría");
//     }
//     console.log('')

//     return formatProducts(results);
// }




module.exports = {
    searchReserveds,
};
