const connection = require("../db");
const { opportunityUrls } = require("../config/watchlist");
const axios = require("axios");
const cheerio = require("cheerio");
const { notification } = require("../integrations/discord/notifier");
const { fetchUrl } = require("../modules/wallapop/client");
const https = require("https");

function getstate(estado) {
  const estados = {
    "Sin estrenar": "sin abrir",
    "En su caja": "sin abrir",
    "Sin abrir": "sin abrir",
    Nuevo: "nuevo",
    "Como nuevo": "como nuevo",
    "En buen estado": "en buen estado",
    "Buen estado": "en buen estado",
    "En condiciones aceptables": "en condiciones aceptables",
    "Lo ha dado todo": "lo ha dado todo",
  };

  return estados[estado] || null;
}

// Búsqueda general de todas las urls
async function searchOpportunities() {
  console.log("");
  console.log("=============================");
  console.log(" INICIO ESCANEO OPORTUNIDADES");
  console.log("=============================");
  console.log("");

  try {
    // const fetchPromises = urls.map(url => fetchTest(url));
    // const resultsArray = await Promise.all(fetchPromises);
    // let concatenatedResults = [];

    // resultsArray.forEach(results => {
    //     concatenatedResults = concatenatedResults.concat(results);
    // });

    // // Si se han encontrado productos nuevos:
    // if (concatenatedResults.length > 0) {

    //     // Actualiza la última ejecución
    //     console.log('título del último producto publicado: ' + concatenatedResults[0].title)
    //     updateLastExecution(concatenatedResults[0].creation_date)

    //     // Elimina los duplicados
    //     concatenatedResults = deleteDuplicatedProducts(concatenatedResults)
    //     console.log('Productois duplicados eliminados correctamente')

    //     // Completa los otros campos adicionales haciendo fetch a la página del articulo uno a uno
    //     concatenatedResults = await fillExtraDataProducts(concatenatedResults)
    //     console.log('Campos extras rellenados correctamente')
    // }

    // // Función para actualizar El last_execution de la base de datos
    // updateLastExecution(1722870721000)

    // opportunities = await filterOpportunities(concatenatedResults)
    let urls = [
      "https://api.wallapop.com/api/v3/search?source=search_box&keywords=iphone&category_id=24200&order_by=newest&latitude=41.387917&longitude=2.1699187",
    ];

    let allNewProducts = [];

    // Obtener todos los prouctos nuevos
    for (const url of urls) {
      // console.log(`Escaneando URL: ${url}`);
      const newProducts = await fetchNewProducts(url);
      allNewProducts = allNewProducts.concat(newProducts);
    }

    // Si se han encontrado productos nuevos:
    if (allNewProducts.length > 0) {
      // COMPRUEBA MODELO DE DATOS Chequea si el modelo de datos ha cambiado
      checkIfDataModelChanged(allNewProducts[0]);

      // ACTUALIZA LA ÚLTIMA EJECUCIÓN
      console.log(
        "título del último producto publicado: " + allNewProducts[0].title
      );
      await updateLastExecution(allNewProducts[0].created_at);

      // ELIMINA DUPLICADOS Eliminar repetidos en caso de que haya un producto duplicado para prevenir
      allNewProducts = removeDuplicates(allNewProducts);

      // FORMATEA Dar el formato personalizado al los productos
      allNewProducts = await formatProducts(allNewProducts);
    }

    opportunities = await filterOpportunities(allNewProducts);

    console.log("");
    console.log("Productos nunevos publicados:", allNewProducts.length);
    console.log(
      "De los cuales oportunidades encontradas:",
      opportunities.length
    );
    console.log("");

    // En caso de que se hayan encontrado oportunidades:
    if (opportunities.length > 0 && opportunities.length < 20) {
      // Generar el mensaje con las oportunidades encontradas
      let msj = stringifyNotification(opportunities);

      // Mandar la notificación en discord
      notification(msj);
      console.log("Mensaje de discord enviado");

      // Subir oportunidades a la base de datos
      uploadOpportunities(opportunities);
    }

    console.log("");
    console.log("=========================");
    console.log("FIN ESCANEO OPORTUNIDADES");
    console.log("=========================");
    console.log("");
  } catch (error) {
    console.error("Error al obtener los nuevos productos:", error);
  }
}

// Retorna todos los nuevos productos de una URL iterada
async function fetchNewProducts(url) {
  let newestItems = [];
  let currentUrl = url;
  let lastProductCreation = await getLastProductCreation(); //esto hau que cambiarlo, ya que hace una consulta cada vez que se ejecuta

  // Para mostrar la category_id en el mensaje de carga de la consola
  let regex = /[?&]category_id=(\d+)/;
  let categoryIdMatch = url.match(regex);
  let categoryId = categoryIdMatch ? categoryIdMatch[1] : "desconocido"; // Maneja el caso donde no se encuentra category_id

  // Loop que solo para hasta que no hayan páginas nuevas o se encuentre un item con created_at menor al cutoff
  while (currentUrl) {
    try {
      // Guarda solo aquellos productos que estén reservados
      const data = await fetchUrl(currentUrl);
      const items = data.data.section.payload.items;

      // Filtrar items que están reservados y tienen created_at mayor o igual al cutoff
      const newest = items.filter(
        (item) => item.created_at >= lastProductCreation
      );
      newestItems = newestItems.concat(newest);

      // Mensaje de carga de la consola
      process.stdout.write(
        `\r${newestItems.length} Nuevos productos obtenidos en la categoría con id: ${categoryId}`
      );

      // Chequear si hay items con created_at menor que el lastProductCreation
      const hasOlderItem = items.some(
        (item) => item.created_at < lastProductCreation
      );

      // Chequea si existen nuevas páginas para saber si seguir con el loop o no
      if (data.meta.next_page && !hasOlderItem) {
        currentUrl = `https://api.wallapop.com/api/v3/search?next_page=${data.meta.next_page}`;
      } else {
        // Console.log para hacer un salto de línea entre mensajes y evitar errores en el mensaje
        console.log("");
        break;
      }
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
      break;
    }
  }
  return newestItems; // Return the newest items
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
      currency: "string",
    },
    images: [
      {
        average_color: "string",
        urls: {
          small: "string",
          medium: "string",
          big: "string",
        },
      },
    ],
    reserved: {
      flag: "boolean",
    },
    location: {
      latitude: "number",
      longitude: "number",
      postal_code: "string",
      city: "string",
      region: "string",
      region2: "string",
      country_code: "string",
    },
    shipping: {
      item_is_shippable: "boolean",
      user_allows_shipping: "boolean",
    },
    favorited: {
      flag: "boolean",
    },
    bump: {
      type: "string",
    },
    web_slug: "string",
    created_at: "number",
    modified_at: "number",
    taxonomy: [
      {
        id: "number",
        name: "string",
        icon: "string",
      },
    ],
    is_favoriteable: {
      flag: "boolean",
    },
    is_refurbished: {
      flag: "boolean",
    },
  };

  function checkProperties(expected, actual, path = "") {
    for (const key in expected) {
      if (expected.hasOwnProperty(key)) {
        const currentPath = path ? `${path}.${key}` : key;

        if (
          typeof expected[key] === "object" &&
          !Array.isArray(expected[key])
        ) {
          if (!actual.hasOwnProperty(key) || typeof actual[key] !== "object") {
            throw new Error(
              `El campo '${currentPath}' está faltando o no es un objeto.`
            );
          }
          checkProperties(expected[key], actual[key], currentPath);
        } else if (Array.isArray(expected[key])) {
          if (!Array.isArray(actual[key])) {
            throw new Error(
              `El campo '${currentPath}' está faltando o no es un array.`
            );
          }
          if (expected[key].length > 0 && actual[key].length > 0) {
            checkProperties(expected[key][0], actual[key][0], currentPath);
          }
        } else if (typeof actual[key] !== expected[key]) {
          throw new Error(
            `El campo '${currentPath}' tiene el tipo '${typeof actual[
              key
            ]}', se esperaba '${expected[key]}'.`
          );
        }
      }
    }
  }

  try {
    checkProperties(expectedModel, item);
    console.log("El modelo de datos es consistente.");
  } catch (error) {
    console.error("⚠️ Cambio en el modelo de datos detectado:", error.message);
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

// Formatear productos
function formatProducts(array) {
  return array.map((product) => {
    return {
      article_id: product.id,
      category_id: product.category_id,
      // sub_category_id: getProductSubCategory(product),
      // sub_sub_category_id: getProductSubSubCategory(product),
      time_to_sell: product.modified_at - product.created_at,
      // product_type: getProductType(product),
      price: product.price.amount,
      title: product.title,
      description: product.description,
      // state: product.state,
      // real_state: getProductRealState(product),
      images: JSON.stringify(product.images.map((imagen) => imagen.urls.big)),
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

async function fetchProductPage(articleUrl) {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(articleUrl)
        .then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);

          item = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.item;

          let estadoPublicaion =
            item.flags.sold == true
              ? "vendido"
              : item.flags.reserved == true
              ? "reservado"
              : "disponible";
          let marca = item.brand;
          let model = item.model;
          let estado = item.condition.text;
          let subCategoria =
            item.taxonomies.length > 1 ? item.taxonomies[1].name : null;
          let subSubCategoria =
            item.taxonomies.length > 2 ? item.taxonomies[2].name : null;
          let views = item.views;
          let favorites = item.favorites;
          let dateSold =
            estadoPublicaion == "vendido" ? item.modifiedDate : null;

          let result = {
            article_status: estadoPublicaion, //✅
            w_brand: marca, //✔
            w_model: model, //⭕
            w_state: estado, //✅
            w_sub_category: subCategoria, //✔
            w_sub_sub_category: subSubCategoria, //✔
            views: views, //✅
            favorites: favorites, //✅
            sale_date: dateSold, //✅
          };

          resolve(result);
        })
        .catch((error) => {
          // console.error('Ha habido un error o el producto ha sido eliminado:');
          // console.error(error);
          reject("error");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

async function fillExtraDataProducts(results) {
  let resultado = {};
  for (const element of results) {
    try {
      let elemento = await fetchProductPage(element.article_url);

      let state = getstate(elemento.w_state);

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

      // console.log(element)

      // return element
    } catch (error) {
      // element.manual_confirmed = 'borrado'
      // console.log(error)
      return;
    }
  }

  return results;
  // console.log(results)
}

// Obtener la categoría de la búsqueda con la url
function getCategoryNameByUrl(url) {
  // Obtener el valor del parámetro "category_ids" de la URL
  const urlParams = new URLSearchParams(new URL(url).search);
  const categoryIds = urlParams.get("category_ids");

  // Mapear los IDs de categoría a sus correspondientes categorías
  const categorias = {
    100: "coches",
    12800: "Motor y accesorios",
    12545: "TV, audio y foto",
    16000: "Móviles y telefonía",
    15000: "Informatica y electronica",
    12579: "Deporte y ocio",
    12900: "Consolas y videojuegos",
    12467: "Hogar y jardín",
    13100: "Electrodomésticos",
  };

  // Devolver la categoría correspondiente o un mensaje de categoría desconocida
  return categorias[categoryIds] || "Categoría desconocida";
}

// Obtener las keywords de la búsqueda con la url
function getNameByUrl(url) {
  // Obtener el valor del parámetro "keywords" de la URL
  const urlParams = new URLSearchParams(new URL(url).search);
  const keywords = urlParams.get("keywords");

  // Devolver el valor de "keywords"
  return keywords;
}

function getProductImages(product) {
  const images = product.images;
  const originalImages = JSON.stringify(images.map((image) => image.original));
  // originalImages = JSON.stringify(originalImages)
  // console.log(typeof originalImages)
  return originalImages;
}

// Función para eliminar todos los productos duplicados del array de productos
function deleteDuplicatedProducts(products) {
  // Creamos un objeto auxiliar para almacenar los objetos únicos
  var objetosUnicos = {};

  // Recorremos el array de objetos
  for (var i = 0; i < products.length; i++) {
    var objeto = products[i];
    var articleId = objeto.article_id;

    // Verificamos si el objeto ya ha sido agregado a los objetos únicos
    if (!objetosUnicos.hasOwnProperty(articleId)) {
      objetosUnicos[articleId] = objeto;
    }
  }

  // Convertimos el objeto de objetos únicos a un array
  var resultado = Object.values(objetosUnicos);

  return resultado;
}

function calcularSumaTotalPrecios(arrayObjetos) {
  let sumaTotal = 0;

  for (let i = 0; i < arrayObjetos.length; i++) {
    const objeto = arrayObjetos[i];
    if (objeto.hasOwnProperty("price")) {
      sumaTotal += objeto.price;
    }
  }

  return sumaTotal;
}

async function filterOpportunities(products) {
  // for (let elemento in products) {
  //     console.log(products[elemento].title);
  // }

  let resultado = [];

  const promises = products.map((product) => detectOpportunity(product));

  resultado = await Promise.all(promises);

  // Limpio los resultados eliminando todos los objetos null
  let nuevoArray = resultado.filter((objeto) => objeto !== null);

  return nuevoArray;

  // nuevoArray.forEach(opportunity => {
  //     console.log(opportunity.article_url);
  // });
}

async function detectOpportunity(product) {
  return new Promise((resolve, reject) => {
    const query = `SELECT price, time_to_sell, article_url FROM products WHERE article_status = 'vendido' AND w_sub_category = '${product.w_sub_category}' AND state = '${product.state}'  AND w_model = '${product.w_model}' ORDER BY price ASC;`;

    connection.query(query, async (err, results) => {
      if (err) {
        console.error("Error al obtener los precios promedios", err);
        reject(err);
      } else {
        if (!product.w_model) {
          resolve(null);
        }

        let suma = 0;

        for (let i = 0; i < results.length; i++) {
          suma += results[i].price;
        }

        let promedio = suma / results.length;

        if (promedio > product.price && results.length > 5) {
          resolve(product);
        } else {
          resolve(null);
        }
      }
    });
  });
}

// Función para insertar los productos en la base de datos
function uploadOpportunity(products) {
  // Consulta los "article_id" existentes en la tabla
  connection.query(
    "SELECT article_id FROM opportunities",
    async (err, results) => {
      if (err) {
        console.error('Error al consultar los "article_id" existentes:', err);
        return;
      }

      // Crea un conjunto de "article_id" existentes para facilitar la verificación
      const existingArticleIds = new Set(results.map((row) => row.article_id));

      // Filtra los productos que no tienen un "article_id" existente
      let newProducts = products.filter(
        (product) => !existingArticleIds.has(product.article_id)
      );

      // Si no hay nuevos productos para insertar, finaliza la función
      if (newProducts.length === 0) {
        console.log("No hay nuevos productos para insertar.");
        return;
      }

      // console.log(newProducts)
      // console.log(newProducts)

      // Inserta los nuevos productos en la base de datos
      const sql =
        "INSERT INTO opportunities (article_id, category_id, time_to_sell, price, title, description, state, images, creation_date, distance, postal_code, article_url, city, user_id, allows_shipping, free_shipping, reserved_date, article_status, w_brand, w_model, w_state, w_sub_category, w_sub_sub_category, views, favorites, sale_date) VALUES ?";
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
          console.error("Error al insertar los productos:", err);
        } else {
          console.log("Productos insertados correctamente:", result);
          console.log(sql);
        }
      });
    }
  );
}

function stringifyNotification(opportunities) {
  let msj = `**Nuevas ${opportunities.length} posibles oportunidades encontradas :**\n \n`;

  for (let i = 0; i < opportunities.length; i++) {
    const title = encodeURIComponent(opportunities[i].w_model);
    const article_url = encodeURIComponent(opportunities[i].article_url);

    msj += `[${decodeURIComponent(title)}](${decodeURIComponent(
      article_url
    )}) ${opportunities[i].state} ${opportunities[i].price}€ \n`;
  }

  return msj;
}

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

// Función para obtener el last execution de mi base de datos
async function getLastProductCreation() {
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

// TEMA UPLOAD BASE DE DATOS

// Función para insertar los productos en la base de datos
function uploadOpportunities(products) {
  // Consulta los "article_id" existentes en la tabla
  connection.query(
    "SELECT article_id FROM opportunities",
    async (err, results) => {
      if (err) {
        console.error('Error al consultar los "article_id" existentes:', err);
        return;
      }

      // Crea un conjunto de "article_id" existentes para facilitar la verificación
      const existingArticleIds = new Set(results.map((row) => row.article_id));

      // Filtra los productos que no tienen un "article_id" existente
      let newProducts = products.filter(
        (product) => !existingArticleIds.has(product.article_id)
      );

      newProducts = await fillExtraDataProducts(newProducts);
      // console.log(newProducts)
      // console.log(newProducts)

      // IMPORNTANTE, que vaya después de haber ejecutado fillExtraDataProducts que borra los articulos bugeados, si no hay nuevos productos para insertar, finaliza la función
      if (newProducts.length === 0) {
        console.log("No hay nuevos productos para insertar.");
        return;
      }

      // Inserta los nuevos productos en la base de datos
      const sql =
        "INSERT INTO opportunities (article_id, category_id, time_to_sell, price, title, description, state, images, creation_date, distance, postal_code, article_url, city, user_id, allows_shipping, free_shipping, reserved_date, article_status, w_brand, w_model, w_state, w_sub_category, w_sub_sub_category, views, favorites, sale_date) VALUES ?";
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
          console.error("Error al insertar los productos:", err);
        } else {
          console.log("Productos insertados correctamente: \n", result);
          console.log(sql);
        }
      });
    }
  );
}

module.exports = {
  searchOpportunities,
  formatProducts,
  getProductImages,
  deleteDuplicatedProducts,
  getCategoryNameByUrl,
  getNameByUrl,
  calcularSumaTotalPrecios,
};
