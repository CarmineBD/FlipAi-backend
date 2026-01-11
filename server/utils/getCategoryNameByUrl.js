// Obtener la categoría de la búsqueda con la url
function getCategoryNameByUrl(url) {
    // Obtener el valor del parámetro "category_ids" de la URL
    const urlParams = new URLSearchParams(new URL(url).search);
    const categoryIds = urlParams.get("category_ids");

    // Mapear los IDs de categoría a sus correspondientes categorías
    const categorias = {
        "100": "coches",
        "12800": "Motor y accesorios",
        "12545": "TV, audio y foto",
        "16000": "Móviles y telefonía",
        "15000": "Informatica y electronica",
        "12579": "Deporte y ocio",
        "12900": "Consolas y videojuegos",
        "12467": "Hogar y jardín",
        "13100": "Electrodomésticos"
    };

    // Devolver la categoría correspondiente o un mensaje de categoría desconocida
    return categorias[categoryIds] || "Categoría desconocida";
}

module.exports = getCategoryNameByUrl;
