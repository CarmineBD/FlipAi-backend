const connection = require("../../db");
const { opportunityUrls } = require("../../config/watchlist");
const axios = require("axios");
const cheerio = require("cheerio");
const { notification } = require("../../integrations/discord/notifier");
const https = require("https");
const { analyzeHddListing } = require("../ai/hddAnalyzer");
const { fetchUrl } = require("./fetchUrl");
const { checkIfDataModelChanged } = require("./checkIfDataModelChanged");
const { updateLastExecution } = require("./updateLastExecution");
const { removeDuplicateProducts } = require("../../utils/removeDuplicateProducts");
const { formatProducts } = require("../../utils/formatProducts");
const { filterOpportunities } = require("./filterOpportunities");

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
    let urls = [
      "https://api.wallapop.com/api/v3/search?keywords=disco+duro+HDD&category_id=24200&order_by=most_relevance&country_code=ES&saved_search_id=7a9a1c92-c628-4ce8-ad74-00918abfe28c&source=search_box&latitude=41.4172299&longitude=2.1480341",
    ];

    let allNewProducts = [];

    // Obtener todos los prouctos nuevos
    for (const url of urls) {
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
      allNewProducts = removeDuplicateProducts(allNewProducts);

      // FORMATEA Dar el formato personalizado al los productos
      allNewProducts = await formatProducts(allNewProducts);
    }

    opportunities = await filterOpportunities(allNewProducts);

    console.log("");
    console.log("Productos nuevos publicados:", allNewProducts.length);
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

      // // Subir oportunidades a la base de datos
      // uploadOpportunities(opportunities);
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

// Fetch una URL de wallapop

// Retorna todos los nuevos productos de una URL iterada
async function fetchNewProducts(url) {
  let newestItems = [];
  let currentUrl = url;
  let lastProductCreation = await getLastProductCreation(); //esto hay que cambiarlo, ya que hace una consulta cada vez que se ejecuta
  console.log("lastProductCreation", lastProductCreation);
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
        (item) => item.created_at > lastProductCreation
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
  return newestItems;
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

function stringifyNotification(opportunities) {
  let msj = `**Nuevas ${opportunities.length} posibles oportunidades encontradas :**\n \n`;

  for (let i = 0; i < opportunities.length; i++) {
    const title = encodeURIComponent(opportunities[i].title);
    const article_url = encodeURIComponent(opportunities[i].article_url);

    msj += `[${decodeURIComponent(title)}](${decodeURIComponent(
      article_url
    )}) ${opportunities[i].price}€ \n
     
    
    `;
  }

  return msj;
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

module.exports = {
  searchOpportunities,
  formatProducts,
  getProductImages,
  deleteDuplicatedProducts,
  getCategoryNameByUrl,
  getNameByUrl,
  calcularSumaTotalPrecios,
};
