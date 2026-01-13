const { getLastProductCreation } = require("./getLastProductCreation");
const { fetchUrl } = require("./fetchUrl");

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

module.exports = {
  fetchNewProducts,
};
