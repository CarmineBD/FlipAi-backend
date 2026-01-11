// const { JSDOM } = require('jsdom');
// const axios = require("axios");
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../../db');

// const url = 'https://es.wallapop.com/item/iphone-xr-909788520'

function getstate(estado) {
    const estados = {
        "Sin estrenar": "sin abrir",
        "En su caja": "sin abrir",
        "Sin abrir": "sin abrir",
        "Nuevo": "nuevo",
        "Como nuevo": "como nuevo",
        "En buen estado": "en buen estado",
        "Buen estado": "en buen estado",
        "En condiciones aceptables": "en condiciones aceptables",
        "Lo ha dado todo": "lo ha dado todo",
    }

    return estados[estado] || null;

}

function getSubCategory(subcategory, subsubcategory) {

    // Subsub categorias
    const subsubcategorias = {
        // Motor y Accesorios
        // Recambios de coches y furgonetas
        'Accesorios': 0,
        'Aceites, lubricantes y líquidos': 0,
        'Carrocerías': 0,
        'Faros y luces indicadoras': 0,
        'Llantas': 0,
        'Motor y piezas de motor': 0,
        'Neumáticos': 0,
        'Seguridad': 0,
        'Suspensión y dirección': 0,
        'Transmisión': 0,
        'Tuning': 0,

        // Recambios de motos y cuatriclicos
        'Aceites, lubricantes y líquidos': 0,
        'Faros y luces indicadoras': 0,
        'Motor y piezas de motor': 0,
        'Neumáticos': 0,
        'Vestimenta y protección': 0,

        // Moda y Accesorios
        // Mujer
        'Calzado': 0,
        'Ropa': 0,

        // Hombre
        'Calzado': 0,
        'Ropa': 0,

        // Accesorios
        'Accesorios para el cabello': 0,
        'Bolsos y mochilas': 0,
        'Bufandas y chales': 0,
        'Cinturones': 0,
        'Corbatas y pañuelos': 0,
        'Gafas de sol': 0, //id: 9567
        'Guantes': 0, //id: 9610
        'Paraguas': 0, //id: 9635
        'Relojes': 0, //id: 9562
        'Sombreros y gorras': 0, //id: 10162
        'Otros accesorios': 0, //id: 9607

        // Joyería id: 10156
        'Anillos': 0, //id: 9534
        'Broches': 0, //id: 9579
        'Cadenas': 0, //id: 9581
        'Colgantes': 0, //id: 9539
        'Collares': 0, //id: 9572
        'Conjuntos de joyas': 0, //id: 9637
        'Cuentas': 0, //id: 9636
        'Gemelos': 0, //id: 9654
        'Joyeros': 0, //id: 9644
        'Pendientes': 0, //id: 9571
        'Piercings': 0, //id: 9651
        'Pulseras': 0, //id: 9570
        'Tobilleras': 0, //id: 9638
        'Otras joyas': 0, //id: 9639

        // Belleza
        'Colonia': 0, //id: 9617
        'Cuidado personal': 0, //id: 9662
        'Maquillaje': 0, //id: 9590
        'Perfume': 0, //id: 9603
        'Utensilios y accesorios': 0, //id: 9660
        'Otros productos de belleza': 0, //id: 9674

        // TV, Audio y Foto
        // Auriculares y cascos
        'Auriculares': 0, //id: 10395
        'Cascos': 0, //id: 10396

        // Cámaras y fotografía
        'Cámaras fotográficas': 0, //id: 10397
        'Flashes y accesorios': 0, //id: 10398
        'Fotografía vintage': 0, //id: 10399
        'Iluminación fotográfica': 0, //id: 10400
        'Objetivos y filtros': 0, //id: 10401
        'Recambios y herramientas': 0, //id: 10402
        'Trípodes y soportes': 0, //id: 10403

        // Pilas y cargadores
        'Baterías multiuso': 0, //id: 10422
        'Cargadores': 0, //id: 10404

        // Proyectores y accesorios
        'Accesorios': 0, //id: 10405
        'Proyectores': 0, //id: 10406

        // Reproductores
        'Accesorios': 0, //id: 10407
        'Reproductores': 0, //id: 10408

        // Televisores y accesorios
        'Accesorios': 0, //id: 10409
        'Antenas': 0, //id: 10410
        'Cables': 0, //id: 10411
        'Home cinema': 0, //id: 10412
        'Mandos': 0, //id: 10413
        'Televisores': 0, //id: 10414
        'Televisores vintage': 0, //id: 10415

        // Vídeo y accesorios
        'Accesorios': 0, //id: 10416
        'Cámaras de vídeo': 0, //id: 10417

        // Móviles y Telefonía
        // Accesorios

        'Auriculares': 0, //id: 10426
        'Cargadores': 0, //id: 10427
        'Fundas': 0, //id: 10428

        // Piezas y recambios
        'Baterías': 0, //id: 10423
        'Cámaras': 0, //id: 10424
        'Pantallas': 0, //id: 10425

        // Informática y Electrónica
        // Cargadores y baterías
        'Baterías': 0, //id: 10304
        'Cargadores': 0, //id: 10305

        // Impresoras y accesorios
        'Cartuchos': 0, //id: 0000
        'Impresoras': 0, //id: 0000

        // Ordenadores y accesorios
        'Componentes y recambios': 0, //id: 10308
        'Ordenadores': 0, //id: 10309
        'Ordenadores portátiles': 0, //id: 10310
        'Ratones': 0, //id: 10311
        'Teclados': 0, //id: 10312

        // Bicicletas
        // Accesorios para bicicletas
        'Bombas e infladores': 0, //id: 10208
        'Electrónica para bicicletas': 0, //id: 010209000
        'Luces': 0, //id: 10210
        'Portabicicletas': 0, //id: 10211
        'Rodillos': 0, //id: 10212

        // Bicicletas y triciclos
        'Bicicletas Infantiles': 0, //id: 10216
        'Bicicletas ciudad': 0, //id: 10213
        'Bicicletas de carretera': 0, //id: 10438
        'Bicicletas eléctricas': 0, //id: 10215
        'Bicicletas plegables': 0, //id: 10217
        'Fixies': 0, //id: 10218
        'MTB': 0, //id: 10214
        'Monociclos': 0, //id: 10219
        'Triciclos': 0, //id: 10220

        // Piezas y recambios de bici
        'Cuadros': 0, //id: 10221
        'Herramientas': 0, //id: 10223
        'Neumáticos y cámaras': 0, //id: 10222
        'Piezas': 0, //id: 10224
        'Recambios': 0, //id: 10225
        'Ruedas': 0, //id: 10226
        'Sillín': 0, //id: 10227

        // Protección y vestimenta
        'Alforjas': 0, //id: 10230
        'Cascos': 0, //id: 10228
        'Gafas ciclismo y de sol': 0, //id: 10229
        'Ropa ciclismo': 0, //id: 10231
        'Zapatillas y cubrezapatillas': 0, //id: 10232

        'Armarios': 10289,
        'Baúles': 10290,
        'Cestas y contenedores para la colada': 10291,
        'Estanterías': 10292,
        'Accesorios de paseo': 10262,
        'Camas': 10257,
        'Corrales': 10258,
        'Higiene': 10259,
        'Jaulas': 10260,
        'Juguetes': 10363,
        'Juegos de baño': 10263,
        'Muebles baño y espejos': 10264,
        'Radiadores de baño': 10265,
        'Toallas de baño y alfombras': 10419,
        'Cuberterías': 10420,
        'Utensilios': 10266,
        'Vajillas': 10267,
        'Almohadas y cojines': 10268,
        'Colchones': 10269,
        'Ropa de cama': 10270,
        'Adornos y decoración': 10271,
        'Alfombras': 10272,
        'Cortinas y estores': 10273,
        'Obras de arte': 10274,
        'Apliques': 10275,
        'Lámparas de mesa': 10276,
        'Lámparas de pie': 10277,
        'Lámparas de techo': 10278,
        'Otros': 10279,
        'Barbacoas': 10280,
        'Iluminación exterior': 10281,
        'Jardinería y huertos': 10282,
        'Mobiliario exterior': 10283,
        'Piscina, sauna y spa': 10284,
        'Antigüedades': 10285,
        'Habitaciones infantiles': 10286,
        'Muebles de dormitorio': 10287,
        'Muebles oficina': 10288,
        'Muebles áreas comunes': 10421,
        'CDs Música': 10234,
        'CDs idiomas': 10233,
        'Discos de vinilo': 10235,
        'Compresores y ecualizadores': 10237,
        'Dispositivos de grabación': 10238,
        'Mesas de mezclas y DJ': 10239,
        'Micrófonos y accesorios': 10240,
        'Bajos': 10241,
        'Guitarras': 10242,
        'Instrumentos de cuerda': 10243,
        'Instrumentos de viento': 10244,
        'Percusión': 10245,
        'Libros antiguos': 10247,
        'Libros escolares y de texto': 10248,
        'Libros infantiles y juveniles': 10249,
        'Libros prácticos y de referencia': 10250,
        'Literatura y narrativa': 10251,
        'Cintas de VHS': 10252,
        'Colecciones de películas y series': 10255,
        'DVDs y Blu-ray': 10253,
        'LaserDiscs': 10254,
        'Otros formatos': 10256,
        'Baberos y paños': 10342,
        'Batidoras y mezcladores': 10343,
        'Biberones & calientabiberones': 10344,
        'Chupetes': 10345,
        'Utensilios y cubertería': 10346,
        'Lactancia': 10347,
        'Libros para madres y padres': 10348,
        'Mochilas': 10349,
        'Porta meriendas': 10350,
        'Uniformes': 10351,
        'Camas infantiles': 10356,
        'Cunas': 10357,
        'Iluminación infantil': 10358,
        'Ropa de cama infantil': 10359,
        'Ropa de cuna': 10360,
        'Sacos de dormir': 10361,
        'Juegos de mesa': 10362,
        'Peluches': 10364,
        '0-6 meses (68 cm)': 10365,
        '6-9 meses (74 cm)': 10374,
        '9-12 meses (80 cm)': 10376,
        '12-18 meses (86 cm)': 10367,
        '18-24 meses (92 cm)': 10369,
        '2-3 años (98 cm)': 10370,
        '3-4 años (104 cm)': 10371,
        '4-5 años (110 cm)': 10372,
        '6-7 años (116 cm)': 10373,
        '8-9 años (130 cm)': 10375,
        '10-12 años (150 cm)': 10366,
        '13-14 años (164 cm)': 10368,
        'Arneses de seguridad': 10377,
        'Monitores para bebés': 10378,
        'Pegatinas para el coche': 10379,
        'Puertas de seguridad y parques': 10380,
        'Termómetros para bebés': 10381,
        'Cochecitos': 10352,
        'Portabebés': 10353,
        'Sillas de coche': 10354,
        'Sillas de paseo': 10355,
        'Andadores': 10382,
        'Correpasillos': 10383,
        'Tronas': 10384,
        'Bañeras': 10313,
        'Duchas': 10314,
        'Inodoros': 10315,
        'Lavamanos': 10316,
        'Herramientas eléctricas': 10318,
        'Maquinaria': 10295,
        'Baldosas y azulejos': 10320,
        'Parquet': 10321,
        'Barnices': 10322,
        'Pinturas': 10323,
        'Cristales': 10324,
        'Puertas': 10325,
        'Puertas correderas': 10326,
        'Ventanas': 10327,
        'Herramientas agrícolas': 10293,
        'Insumos agrícolas': 10294,
        'Repuestos': 10296,
        'Tractores': 10297,
        'Vehículos': 10298,
        'Equipamiento industrial': 10299,
        'Insumos industriales': 10301,
        'Repuestos de herramientas': 10302,
        'Repuestos de maquinaria': 10303,
        'Clases de idiomas': 10385,
        'Personal trainers': 10386,
        'Tutores y soporte escolar': 10387,
        'Cuidadores de ancianos': 10388,
        'Niñeras': 10389,
        'Mensajería': 10390,
        'Mudanzas': 10391,
        'Transporte': 10392,
        'Albañil': 10393,
        'Electricista': 10394

    }

    // Sub categorias
    const subcategories = {
        // "Motor y Accesorios"
        "GPS y electrónica": "0000",
        "Herramientas": "0000",
        "Recambios de coches y furgonetas": "0000",
        "Recambios de motos y cuatriclicos": "0000",
        "Otros": "0000",

        // TV, Audio y Foto
        "Auriculares y cascos": "0000",
        "Cámaras de vigilancia": "0000",
        "Cámaras y fotografía": "0000",
        "Drones": "0000",
        "Pilas y cargadores": "0000",
        "Proyectores y accesorios": "0000",
        "Reproductores": "0000",
        "Televisores y accesorios": "0000",
        "Vídeo y accesorios": "0000",
        "Otros": "0000",

        // Móviles y Telefonía
        "Accesorios": "0000",
        "Cables": "0000",
        "Piezas y recambios": "0000",
        "Smartwatches": "0000",
        "Tablets": "0000",
        "Teléfonos antiguos": "0000",
        "Teléfonos móviles": "0000",
        "Otros": "0000",

        // Informática y Electrónica
        "Cables": "0000",
        "Cargadores y baterías": "0000",
        "Impresoras y accesorios": "0000",
        "Monitores": "0000",
        "Ordenadores y accesorios": "0000",
        "Realidad virtual y aumentada": "0000",
        "Software": "0000",
        "Otros": "0000",

        // Deporte y ocio
        "Baloncesto": "0000",
        "Balonmano": "0000",
        "Estáticas y elípticas": "0000",
        "Fitness, running y yoga": "0000",
        "Fútbol": "0000",
        "Golf": "0000",
        "Juegos recreativos y de mesa": "0000",
        "Manualidades": "0000",
        "Montaña y esquí": "0000",
        "Natación y accesorios piscina": "0000",
        "Otros deportes": "0000",
        "Patinetes y patinaje": "0000",
        "Rugby": "0000",
        "Tenis y pádel": "0000",
        "Vóley": "0000",
        "Otros": "0000",

        // Bicicletas
        "Accesorios para bicicletas": "0000",
        "Bicicletas y triciclos": "0000",
        "Piezas y recambios de bici": "0000",
        "Protección y vestimenta": "0000",
        "Otros": "0000",

        // Consolas y Videojuegos
        "Accesorios de consolas": "0000",
        "Consolas": "0000",
        "Manuales y guías": "0000",
        "Merchandising de videojuegos": "0000",
        "Recambios de consolas": "0000",
        "Videojuegos": "0000",
        "Otros": "0000",

        // Hogar y Jardín
        "Almacenaje": "0000",
        "Artículos para mascotas": "0000",
        "Baño": "0000",
        "Cocina, comedor y bar": "0000",
        "Colchones y ropa de cama": "0000",
        "Decoración": "0000",
        "Iluminación interior": "0000",
        "Jardín y exteriores": "0000",
        "Mobiliario para la casa": "0000",
        "Otros": "0000",

        // Electrodomésticos
        "Climatización": "0000",
        "Electrodomésticos de cocina": "0000",
        "Lavandería y plancha": "0000",
        "Pequeños electrodomésticos": "0000",
        "Piezas y recambios": "0000",
        "Vitrocerámica": "0000",
        "Otros": "0000",

        // Cine, Libros y Música
        "CDs y Vinilos": "0000",
        "Cómics y novelas gráficas": "0000",
        "Equipo profesional de sonido": "0000",
        "Instrumentos musicales": "0000",
        "Libros": "0000",
        "Partituras y libretos": "0000",
        "Películas y Series": "0000",
        "Pósters y merchandising": "0000",
        "Revistas": "0000",
        "Tocadiscos": "0000",
        "Otros": "0000",

        // Niños y Bebés
        "Accesorios de baño": "0000",
        "Alimentación del bebé": "0000",
        "Artículos de maternidad": "0000",
        "Artículos escolares": "0000",
        "Cunas y camas": "0000",
        "Disfraces infantiles": "0000",
        "Juguetes, juegos y peluches": "0000",
        "Mobiliario infantil": "0000",
        "Ropa infantil": "0000",
        "Seguridad y cuidado": "0000",
        "Transporte del bebé": "0000",
        "Tronas y andadores": "0000",
        "Otros": "0000",

        // Coleccionismo
        "Antigüedades": "0000",
        "Artesanías y decoración": "0000",
        "Artículos de escritorio": "0000",
        "Banderas": "0000",
        "Coches y motocicletas": "0000",
        "Coleccionismo deportivo": "0000",
        "Coleccionismo militar": "0000",
        "Filatelia y sellos": "0000",
        "Imanes": "0000",
        "Llaveros": "0000",
        "Monedas y billetes": "0000",
        "Muñecos": "0000",
        "Naipes": "0000",
        "Postales y suvenires": "0000",
        "Relojes": "0000",
        "Otros": "0000",

        // Construcción y Reformas
        "Balcones": "0000",
        "Baños": "0000",
        "Cocinas": "0000",
        "Electricidad e Iluminación": "0000",
        "Escaleras y andamios": "0000",
        "Ferretería": "0000",
        "Herramientas y maquinaria": "0000",
        "Madera y otros materiales": "0000",
        "Pavimentos y revestimientos": "0000",
        "Pinturas y barnices": "0000",
        "Puertas y ventanas": "0000",
        "Otros": "0000",

        // Industria y Agricultura
        "Agricultura": "0000",
        "Industria": "0000",

    }

    if (subsubcategory) {

    } else {

    }



    return subcategories[subcategory] || false;
}

function getbrand(w_brand) {
    const brands = {
        'Acer': 1,
        'Alcatel': 2,
        'Allview': 3,
        'Amazon': 4,
        'Apple': 5,
        'Archos': 6,
        'Asus': 7,
        'BenQ': 8,
        'BlackBerry': 9,
        'Blackview': 10,
        'BLU': 11,
        'BQ': 12,
        'Casio': 13,
        'Cat': 14,
        'Celkon': 15,
        'Coolpad': 16,
        'Cubot': 17,
        'Dell': 18,
        'Doogee': 19,
        'Energizer': 20,
        'Eten': 21,
        'Fairphone': 22,
        'Garmin-Asus': 23,
        'Gigabyte': 24,
        'Gionee': 25,
        'Google': 26,
        'Haier': 27,
        'Honor': 28,
        'HP': 29,
        'Htc': 30,
        'Huawei': 31,
        'I-mate': 32,
        'Icemobile': 33,
        'Infinix': 34,
        'INQ': 35,
        'Intex': 36,
        'itel': 37,
        'Jolla': 38,
        'Karbonn': 39,
        'Kyocera': 40,
        'Lava': 41,
        'LeEco': 42,
        'Lenovo': 43,
        'LG': 44,
        'Meizu': 45,
        'Micromax': 46,
        'Microsoft': 47,
        'Mitac': 48,
        'Motorola': 49,
        'NEC': 50,
        'Neonode': 51,
        'NIU': 52,
        'Nokia': 53,
        'Nothing': 54,
        'Nvidia': 55,
        'O2': 56,
        'OnePlus': 57,
        'Oppo': 58,
        'Orange': 59,
        'Palm': 60,
        'Panasonic': 61,
        'Pantech': 62,
        'Philips': 63,
        'Prestigio': 64,
        'QMobile': 65,
        'Qtek': 66,
        'Razer': 67,
        'Realme': 68,
        'Sagem': 69,
        'Samsung': 70,
        'Sharp': 71,
        'Sonim': 72,
        'Sony': 73,
        'Sony Ericsson': 74,
        'Spice': 75,
        'T-Mobile': 76,
        'TCL': 77,
        'TECNO': 78,
        'Toshiba': 79,
        'Ulefone': 80,
        'Verykool': 81,
        'Vivo': 82,
        'VK Mobile': 83,
        'Vodafone': 84,
        'Wiko': 85,
        'Xiaomi': 86,
        'XOLO': 87,
        'Yezz': 88,
        'Yota': 89,
        'YU': 90,
        'ZTE': 91,

    }
}



async function fetchProductPage(articleUrl) {
    return new Promise((resolve, reject) => {
        try {
            axios.get(articleUrl)
                .then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);

                    // let json = $('#__NEXT_DATA__');
                    // json = JSON.parse(json.html())
                    // let item = json.props.pageProps.item


                    item = JSON.parse($('#__NEXT_DATA__').html()).props.pageProps.item



                    let estadoPublicaion = item.flags.sold == true ? 'vendido' : (item.flags.reserved == true ? 'reservado' : 'des-reservado')
                    let marca = item.brand
                    let model = item.model
                    let estado = item.condition.text
                    let subCategoria = item.taxonomies.length > 1 ? item.taxonomies[1].name : null
                    let subSubCategoria = item.taxonomies.length > 2 ? item.taxonomies[2].name : null
                    let views = item.views
                    let favorites = item.favorites
                    let dateSold = estadoPublicaion == 'vendido' ? item.modifiedDate : null
                    let lastModification = item.modifiedDate


                    // console.log('El estado de la publicación es: ' + estadoPublicaion)
                    // console.log('La marca es: ' + marca)
                    // console.log('El modelo es: ' + model)
                    // console.log('El estado del producto es: ' + estado)
                    // console.log('La sub categoría es: ' + subCategoria)
                    // console.log('La subsub categoría es: ' + subSubCategoria)
                    // console.log('Visitas: ' + views)
                    // console.log('Favoritos: ' + favorites)
                    // console.log('la fecha en la que se vendió: ' + dateSold)

                    let result = {
                        'article_status': estadoPublicaion,         //✅
                        'w_brand': marca,                           //✔
                        'w_model': model,                           //⭕ 
                        'w_state': estado,                          //✅
                        'w_sub_category': subCategoria,             //✔
                        'w_sub_sub_category': subSubCategoria,      //✔
                        'views': views,                             //✅
                        'favorites': favorites,                     //✅
                        'sale_date': dateSold,                      //✅
                        'last_modification': lastModification,

                    }

                    resolve(result);





                    // DESDE EL HTML:

                    // const flag = $('[class*=ItemDetailFlags]');
                    // views = $('[aria-label="Views"]');
                    // favorites = $('[aria-label="Favorites"]');
                    // const info = $('[class*=ItemDetailAdditionalInformation]');
                    // const tags = $('[class*=ItemDetailTaxonomies] span');

                    // // Para identificar las 3 infos
                    // if (info.eq(0).html() && info.eq(1).html() && info.eq(2).html()) {
                    //     console.log('HAY 3 INFOS')
                    //     console.log('marca: ' + info.eq(0).html())
                    //     console.log('modelo: ' + info.eq(1).html())
                    //     console.log('estado: ' + info.eq(2).html())
                    // } else if (info.eq(0).html() && info.eq(1).html()) {
                    //     console.log('HAY 2 INFOS')

                    //     if (detectarEstado(info.eq(1).html())) {
                    //         console.log('Que es una marca: ' + info.eq(0).html())
                    //         console.log('Y un estado: ' + info.eq(1).html())
                    //     } else {
                    //         console.log('Que es una marca: ' + info.eq(0).html())
                    //         console.log('Y un modelo: ' + info.eq(1).html())
                    //     }


                    // } else if (info.eq(0).html()) {
                    //     console.log('HAY 1 INFO')

                    //     if (detectarEstado(info.eq(0))) {
                    //         console.log('es un estado')
                    //         console.log(typeof detectarEstado(info.eq(0)))
                    //     }


                    //     if (detectarEstado(info.eq(0).html())) {
                    //         console.log('Que es un estado: ' + info.eq(0).html())
                    //     } else {
                    //         console.log('Que es una marca: ' + info.eq(0).html())
                    //     }


                    // } else {
                    //     console.log('no se ha detectado ninguna info')
                    // }

                    // // para identificar las sub categorías
                    // if (tags.eq(0).html() && tags.eq(1).html()) {
                    //     console.log('HAY 2 tags')
                    //     console.log('Que es una sub categoría: ' + tags.eq(0).html())
                    //     console.log('Y una sub sub categoría: ' + tags.eq(1).html())
                    // } else if (tags.eq(0).html()) {
                    //     console.log('HAY 1 tags')
                    //     console.log('Que es una sub categoría: ' + tags.eq(0).html())
                    // } else {
                    //     console.log('no se ha detectado ninguna tags')
                    // }

                    // console.log(flag.html())
                })
                .catch(error => {
                    // console.error('Ha habido un error o el producto ha sido eliminado:');
                    // console.error(error);
                    reject('error');
                });

        } catch (error) {
            console.error('Error:', error);
        }

    });
}

// errores en los 12534, 18625
// con esta query 'SELECT * FROM products WHERE 1 ORDER BY reserved_date ASC'


async function updateProducts(results) {

    let contador = 0
    let borrados = 0
    let reservados = 0
    let vendidos = 0

    // Recorrer cada elemento y modificar la columna "date_sold"
    for (const element of results) {
        // console.log(element.title);

        try {
            let elemento = await fetchProductPage(element.article_url);

            // suma para el contador de vendidos y reservados
            elemento.article_status == 'reservado' ? reservados++ : vendidos++

            let state = getstate(elemento.w_state)

            // console.log(element.title + ': ' + elemento.views)
            // Aquí puedes utilizar newDate para actualizar la base de datos
            let updateQuery =
                `UPDATE products SET ` +
                `article_status = '${elemento.article_status}', ` +
                `w_brand = '${elemento.w_brand}', ` +
                `w_model = '${elemento.w_model}', ` +
                `w_sub_category = '${elemento.w_sub_category}', ` +
                `w_sub_sub_category = '${elemento.w_sub_sub_category}', ` +
                `views = ${elemento.views}` +
                `, favorites = ${elemento.favorites}` +
                `, sale_date = ${elemento.sale_date}`

            if (state != null) {
                updateQuery += `, state = '${state}'`
            }


            updateQuery += ` WHERE id = ${element.id}`


            db.query(updateQuery, (updateError, updateResults, updateFields) => {
                if (updateError) throw updateError;
                console.log(`Elemento número ${contador} actualizado con éxito: ${element.title}`);
                // console.log(elemento.w_state)
                // console.log(updateQuery)
            });
        } catch (error) {

            // suma el contador de borrados
            borrados++

            let updateQuery = ''

            if (element.article_status == 'reservado') {
                updateQuery = `UPDATE products SET manual_confirmed = 'borrado', article_status = 'reservado-borrado' WHERE id = ${element.id}`;
            } else if (element.article_status == 'vendido') {
                updateQuery = `UPDATE products SET manual_confirmed = 'borrado', article_status = 'vendido-borrado' WHERE id = ${element.id}`;
            } else {
                updateQuery = `UPDATE products SET manual_confirmed = 'borrado', article_status = 'borrado' WHERE id = ${element.id}`;
            }

            db.query(updateQuery, (updateError, updateResults, updateFields) => {
                if (updateError) throw updateError;
                console.log(`Elemento borrado número ${contador} actualizado con éxito: ${element.title}`);
            });
        }
        contador++
    }

    // Impresión de los resultados
    console.log('actualizados: ' + contador + ' productos')
    console.log('de los cuales: ' + borrados + ' han sido borrados')
    console.log(reservados + ' siguen reservados')
    console.log(vendidos + ' vendidos confirmados')
}

// AutoRellena los campos faltantes en el escaneo inicial de productos reservados
async function fillExtraDataProducts(results) {
    for (const element of results) {
        try {
            let elemento = await fetchProductPage(element.article_url);

            elemento.article_status == 'reservado' ? reservados++ : vendidos++

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
                element.state = elemento.state
            }

            console.log(element)
            return element

        } catch (error) {
            element.manual_confirmed = 'borrado'
        }

    }
}

// Función para la actualización de los productos (cada 24h)
async function checkSoldProducts(results) {
    let contador = 0
    let borrados = 0
    let reservados = 0
    let vendidos = 0
    let reservadosBorrados = 0
    let vendidosBorrados = 0

    for (const element of results) {
        try {
            let elemento = await fetchProductPage(element.article_url);

            elemento.article_status == 'reservado' ? reservados++ : vendidos++

            let state = getstate(elemento.w_state)

            let updateQuery =
                `UPDATE products SET ` +
                `article_status = '${elemento.article_status}'` +
                `, sale_date = ${elemento.sale_date}`

            if (state != null) {
                updateQuery += `, state = '${state}'`
            }

            updateQuery += ` WHERE id = ${element.id}`

            db.query(updateQuery, (updateError, updateResults, updateFields) => {
                if (updateError) throw updateError;
                console.log(`Elemento número ${contador} actualizado con éxito: ${element.title}`);
            });
        } catch (error) {
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



}

// Función para la actualización de los productos (cada 24h)
async function checkOldReserveds() {

    const ahora = Date.now(); // Obtiene el tiempo actual en milisegundos desde el 1 de enero de 1970
    const unMes = 2592000000
    const haceUnMes = ahora - unMes

    let contador = 0
    let borrados = 0
    let reservados = 0
    let vendidos = 0
    let reservadosBorrados = 0
    let vendidosBorrados = 0

    db.query(`SELECT * FROM products WHERE reserved_date > ${haceUnMes} AND article_status = 'reservado' ORDER BY reserved_date DESC`, async (error, results, fields) => {
        try {
            for (const element of results) {
                try {

                    let elemento = await fetchProductPage(element.article_url);

                    elemento.article_status == 'reservado' ? reservados++ : vendidos++

                    let state = getstate(elemento.w_state)

                    let updateQuery =
                        `UPDATE products SET ` +
                        `article_status = ${elemento.article_status == 'reservado' ? 'reservado por mucho tiempo' : 'vendido despues de mucho tiempo'}` +
                        `, sale_date = ${elemento.sale_date}`

                    if (state != null) {
                        updateQuery += `, state = '${state}'`
                    }

                    updateQuery += ` WHERE id = ${element.id}`

                    db.query(updateQuery, (updateError, updateResults, updateFields) => {
                        if (updateError) throw updateError;
                        console.log(`Elemento número ${contador} actualizado con éxito: ${element.title}`);
                    });
                } catch (error) {
                    // suma el contador de borrados
                    borrados++

                    // inicializar la query
                    let updateQuery = ''

                    if (element.article_status == 'reservado') {
                        reservadosBorrados++
                        updateQuery = `UPDATE products SET manual_confirmed = 'borrado', article_status = 'reservado_borrado' WHERE id = ${element.id}`;
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
        } catch (error) {
            console.error('Error al obtener los datos del último mes:', error);
        }
        console.log('actualizados: ' + contador + ' productos')
        console.log('de los cuales: ' + borrados + ' han sido borrados')
        console.log(reservados + ' siguen reservados')
        console.log(vendidos + ' vendidos confirmados')
        console.log(reservadosBorrados + ' reservados-borrados confirmados')
        console.log(vendidosBorrados + ' vendidos-borrados confirmados')



    })





}





function actualizarBD() {
    let valores = [
        'Acer',
        'Ainol',
    ]
    for (let i = 0; i < valores.length; i++) {
        const valor = valores[i];
        db.query('INSERT INTO brands (name, category_id) VALUES (?, ?)', [valor, 15000]);
    }
}

module.exports = {
    fetchProductPage,
    updateProducts,
    actualizarBD,
    getstate
};
