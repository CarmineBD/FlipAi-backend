const https = require('https');

async function testing() {
    console.log('==============');
    console.log('INICIO TESTING');
    console.log('==============');

    const urls = [
        'https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=16000&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=cascos&items_count=40',
        'https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=16000&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=1000&keywords=funda&items_count=40',
    ];

    try {
        const fetchPromises = urls.map(url => fetchTest(url));
        const resultsArray = await Promise.all(fetchPromises);

        let concatenatedResults = [];

        resultsArray.forEach(results => {
            concatenatedResults = concatenatedResults.concat(results);
        });

        console.log('Resultados totales:', concatenatedResults);
        console.log('Cantidad total de resultados:', concatenatedResults.length);

        console.log('==============');
        console.log('FIN TESTING');
        console.log('==============');
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

testing();



async function fetchTest(url) {
    let totalResults = 0;
    let totalPrices = 0;
    let results = [];
    let newResults = true;

    while (newResults) {
        let newUrl = url + "&start=" + totalResults;

        try {
            const response = await new Promise((resolve, reject) => {
                https.get(newUrl, resolve).on('error', reject);
            });

            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            await new Promise((resolve) => {
                response.on('end', resolve);
            });

            const parsedData = JSON.parse(data);

            var products = parsedData.search_objects;
            var filteredProducts = products.filter(function (product) {
                totalPrices += product.price;
                return product.flags.reserved === true;
            });

            totalResults = totalResults + Number(products.length);
            results = results.concat(filteredProducts);

            if (products.length === 0) {
                newResults = false;
            }
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
            newResults = false; // Detener el bucle en caso de error
        }
    }

    console.log(results.length + " de " + totalResults + " (" + (results.length * 100 / totalResults).toFixed(2) + "%) productos reservados buscando '" + getNameByUrl(url) + "' en la categoría '" + getCategoryNameByUrl(url) + "'");
    console.log(" " + results.length + " de " + totalResults + " (" + (results.length * 100 / totalResults).toFixed(2) + "%) volumen ventas: " + (calcularSumaTotalPrecios(results)).toFixed(2) + "€, promedio precio publicación: " + (totalPrices / totalResults).toFixed(2) + "€, promedio precio venta: " + (calcularSumaTotalPrecios(results) / results.length).toFixed(2) + "€. buscando '" + getNameByUrl(url) + "' en la categoría '" + getCategoryNameByUrl(url) + "'");
    console.log((totalPrices / totalResults).toFixed(2));
    console.log(calcularSumaTotalPrecios(results));

    return formatProducts(results);
}











// Formateador de productos
function formatProducts(array) {
    return array.map((product) => {
        return {
            article_id: product.id,
            category_id: product.category_id,
            // sub_category_id: getProductSubCategory(product),
            // sub_sub_category_id: getProductSubSubCategory(product),
            time_to_sell: (product.modification_date - product.creation_date),
            // product_type: getProductType(product),
            price: product.price,
            title: product.title,
            description: product.description,
            // state: product.state,
            // real_state: getProductRealState(product),
            images: getProductImages(product),
            creation_date: product.creation_date,
            distance: product.distance,
            postal_code: product.location.postal_code,
            user_id: product.user.id,
            allows_shipping: product.shipping.user_allows_shipping,
            free_shipping: product.free_shipping,
            article_url: "https://es.wallapop.com/item/" + product.web_slug,
            city: product.location.city,
            reserved_date: product.modification_date,

        };
    });
}

// Obtener las keywords de la búsqueda con la url
function getNameByUrl(url) {
    // Obtener el valor del parámetro "keywords" de la URL
    const urlParams = new URLSearchParams(new URL(url).search);
    const keywords = urlParams.get("keywords");

    // Devolver el valor de "keywords"
    return keywords;
}

function calcularSumaTotalPrecios(arrayObjetos) {
    let sumaTotal = 0;

    for (let i = 0; i < arrayObjetos.length; i++) {
        const objeto = arrayObjetos[i];
        if (objeto.hasOwnProperty('price')) {
            sumaTotal += objeto.price;
        }
    }

    return sumaTotal;
}

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

function getProductImages(product) {
    const images = product.images;
    const originalImages = JSON.stringify(images.map((image) => image.original));
    // originalImages = JSON.stringify(originalImages)
    // console.log(typeof originalImages)
    return originalImages
}




module.exports = {
    testing
};
