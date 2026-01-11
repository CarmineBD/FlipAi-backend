const reservedUrls = [
  // NUEVAS URLS
  /* Tecnología */ "https://api.wallapop.com/api/v3/search?time_filter=lastWeek&category_id=24200&latitude=41.38804&longitude=2.17001&source=default_filters&distance_in_km=10&show_multiple_sections=false",
  /* Hogar y jardín */ "https://api.wallapop.com/api/v3/search?time_filter=lastWeek&category_id=12467&latitude=41.38804&longitude=2.17001&source=default_filters&distance_in_km=10&show_multiple_sections=false",
  /* Deporte y ocio */ "https://api.wallapop.com/api/v3/search?time_filter=lastWeek&category_id=12579&latitude=41.38804&longitude=2.17001&source=default_filters&distance_in_km=10&show_multiple_sections=false",
  /* Electrodomésticos */ "https://api.wallapop.com/api/v3/search?time_filter=lastWeek&category_id=13100&latitude=41.38804&longitude=2.17001&source=default_filters&distance_in_km=10&show_multiple_sections=false",
  // /* Cine, libros y música */ "https://api.wallapop.com/api/v3/search?time_filter=lastWeek&category_id=12463&latitude=41.38804&longitude=2.17001&source=default_filters&distance_in_km=10&show_multiple_sections=false",
  /* Coches */ "https://api.wallapop.com/api/v3/search?time_filter=lastWeek&category_id=100&latitude=41.38804&longitude=2.17001&source=default_filters&distance_in_km=10&show_multiple_sections=false",

  /* Legos */ "https://api.wallapop.com/api/v3/search?time_filter=lastWeek&latitude=41.38804&longitude=2.17001&source=default_filters&distance_in_km=10&show_multiple_sections=false&keywords=lego",

  /* Componentes de ordewnador en TODA ESPAÑA CON ENVÍOS */ "https://api.wallapop.com/api/v3/search?category_id=24200&subcategory_ids=10304&time_filter=lastWeek&latitude=41.38804&longitude=2.17001&source=default_filters&show_multiple_sections=false&is_shippable=true",

  // PARA EL 1 DE ENERO DE 2026
  // En caso de que quiera absolutamente todos los productos de todo wallapop
  // "https://api.wallapop.com/api/v3/search?source=search_box&order_by=newest",

  // En caso de que quiera absolutamente todos lso productos de todo wallapop CON ENVIOS
  // "https://api.wallapop.com/api/v3/search?source=search_box&order_by=newest&is_shippable=true",

  // O BIEN SOLO POR CATEGOIRAÍAS QUE ME INTERESAN
  // Coches - https://api.wallapop.com/api/v3/search?category_id=100&order_by=newest&source=side_bar_filters
  // Motos - https://api.wallapop.com/api/v3/search?category_id=14000&order_by=newest&source=side_bar_filters
  // Tecnología y electrónica - https://api.wallapop.com/api/v3/search?category_id=24200&order_by=newest&source=side_bar_filters
  // Deporte y ocio? - https://api.wallapop.com/api/v3/search?category_id=12579&order_by=newest&source=side_bar_filters
  // Bicicletas? - https://api.wallapop.com/api/v3/search?category_id=17000&order_by=newest&source=side_bar_filters
  // Hogar y jardin - https://api.wallapop.com/api/v3/search?category_id=12467&order_by=newest&source=side_bar_filters
  // Electrodomésticos - https://api.wallapop.com/api/v3/search?category_id=13100&order_by=newest&source=side_bar_filters
  // Cine, libros y música? (muy pesado) - https://api.wallapop.com/api/v3/search?category_id=12463&order_by=newest&source=side_bar_filters

  // /* Legos en TODA ESPAÑA CON ENVÍOS */ "https://api.wallapop.com/api/v3/search?time_filter=lastWeek&latitude=41.38804&longitude=2.17001&source=default_filters&show_multiple_sections=false&keywords=lego&is_shippable=true",

  // // Móviles y telefonía
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=16000&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=moviles&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=16000&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=smartphones&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=16000&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=smartwatches&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=16000&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=tablets&items_count=40",

  // // Informática y electrónica
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=15000&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=monitores&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=15000&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=monitor&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=15000&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=ordenadores&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=15000&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=teclados&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=15000&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=ratones&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=15000&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=componentes%20y%20recambios&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=15000&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=Realidad%20virtual%20y%20aumentada&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=15000&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=fuentes de alimentacion",

  // // TV, Audio y Foto
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12545&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=Cascos&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12545&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=Auriculares&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12545&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=Camaras&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12545&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=Televisores&items_count=40",

  // // Consolas y videojuegos
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12900&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=Consolas&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12900&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=Play&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12900&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=Play station&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12900&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=ps5&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12900&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=ps4&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12900&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=Xbox&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12900&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=Videojuegos&items_count=40",

  // // Deporte y ocio
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12579&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=Golf&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12579&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=Tenis&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12579&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=Padel&items_count=40",

  // // Cine, libros, música
  // // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12463&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=libros",

  // // Moda y accesorios
  // // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12465&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=ropa",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12465&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=relojes",
  // // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12465&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=zapatillas",

  // // Coches
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastMonth&category_ids=100&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=coches",

  // // Hogar y jardín
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12467&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=plantas",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12467&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=terraza",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&category_ids=12467&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=jardin",

  // // Sin categoría
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=ikea&items_count=40",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=pax",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=fitness",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=camaras&items_count=40",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=juegos%20de%20mesa",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=acuarios",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=amazon",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=altavoces",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=robot",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=tarjetas graficas",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=memorias ram",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=ssd",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=tarjetas madres",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=placas madres",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=placas base",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=discos duros",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=portatil",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=discos duros",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=procesadores",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=mesa",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=sillas",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=plegables",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=neveras",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=aspiradoras",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=camping",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=aire acondicionado",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=ventiladores",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=senderismo",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=baldosas",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=cesped",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=Jardín",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=asic",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=minería",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=rig",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=minería",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=muji",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=lavavajillas",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=lavadoras",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=congeladores",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=neveras",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=cocinas",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=estufas",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=microondas",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=hornos",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=plantas",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=lego",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=smartbox",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=adviento",

  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=macbook",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=imac",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=xiaomi",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=apple",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=samsung",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=sony",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=logitech",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=razer",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=embody",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=ipad",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=amazon",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=amazon",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=iphone",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=bosch",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=siemens",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=leroy",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=geforce",
  // "https://api.wallapop.com/api/v3/general/search?time_filter=lastWeek&latitude=41.41722000735683&longitude=2.148069973172653&order_by=newest&distance=10000&keywords=festool",
];


module.exports = {
  reservedUrls,
};
