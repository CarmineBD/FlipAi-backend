const db = require("../db");
// const fetch = require('node-fetch');
const axios = require("axios");

// Modelo para obtener los datos de los productos con filtros
getCustom2 = (params) => {
  return new Promise((resolve, reject) => {
    // let query = "SELECT price, " +
    //     "CONCAT(" +
    //     "  FLOOR(time_to_sell / (24*60*60*1000)), 'd ', " +
    //     "  FLOOR((time_to_sell % (24*60*60*1000)) / (60*60*1000)), 'h ', " +
    //     "  FLOOR((time_to_sell % (60*60*1000)) / (60*1000)), 'm ', " +
    //     "  FLOOR((time_to_sell % (60*1000)) / 1000), 's'" +
    //     ") AS time_to_sell, " +
    //     "DATE_FORMAT(FROM_UNIXTIME(reserved_date / 1000), '%d/%m/%Y') AS reserved_date, " +
    //     "title, description, article_url " +
    //     "FROM products " +
    //     "WHERE article_status = 'vendido' AND " +
    //     "      w_sub_category = 'Smartphone' AND " +
    //     "      state = 'como nuevo' AND " +
    //     "      w_model = 'iphone 13' " +
    //     "ORDER BY price ASC";

    // 7ms ⭐
    // let query = 'SELECT * FROM products ORDER BY id LIMIT 100 OFFSET 0'

    // 7ms (también que el anterior) ⭐
    // let query = 'SELECT * FROM products p JOIN categories c ON p.category_id = c.id ORDER BY p.reserved_date DESC LIMIT 100 OFFSET 0'

    // obtener categoría y nomrbre de categoría
    // 7ms (también que el anterior) ⭐
    // let query = 'SELECT * FROM products p JOIN categories c ON p.category_id = c.id ORDER BY p.reserved_date DESC LIMIT 100 OFFSET 0'

    // Lo mismo que antes pero con el resto de campos
    // 1036ms (también que el anterior) ❌
    // let query = 'SELECT p.id, c.id AS category_id, c.name AS category_name, pt.id AS product_type_id, pt.name AS product_type_name, b.id AS brand_id, b.name AS brand_name, col.id AS color_id, col.name AS color_name, m.id AS model_id, m.name AS model_name, sc.id AS sub_category_id, sc.name AS sub_category_name FROM products p JOIN categories c ON p.category_id = c.id LEFT JOIN product_types pt ON p.product_type_id = pt.id LEFT JOIN brands b ON p.brand_id = b.id LEFT JOIN colors col ON p.color_id = col.id LEFT JOIN models m ON p.model_id = m.id LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id ORDER BY p.reserved_date DESC LIMIT 100 OFFSET 0'

    // 1620ms (también que el anterior) ❌
    let query =
      "SELECT p.*, c.id AS category_id, c.name AS category_name, pt.id AS product_type_id, pt.name AS product_type_name, b.id AS brand_id, b.name AS brand_name, col.id AS color_id, col.name AS color_name, m.id AS model_id, m.name AS model_name, sc.id AS sub_category_id, sc.name AS sub_category_name FROM products p JOIN categories c ON p.category_id = c.id LEFT JOIN product_types pt ON p.product_type_id = pt.id LEFT JOIN brands b ON p.brand_id = b.id LEFT JOIN colors col ON p.color_id = col.id LEFT JOIN models m ON p.model_id = m.id LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id ORDER BY p.reserved_date DESC LIMIT 100 OFFSET 0";

    // Devuelve los resultados de la búqueda
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          'Error al obtener las "sub_categories" con filtros desde la base de datos: ',
          err
        );
        reject(err);
      } else {
        resolve(results);
        console.log(query);
      }
    });
  });
};

// Modelo para obtener los datos de los productos con filtros
getCustom = (params) => {
  return new Promise((resolve, reject) => {
    // let query = "SELECT title FROM products WHERE article_id=nz005nk0qrzo ORDER BY reserved_date DESC LIMIT 100";

    // let query = 'SHOW COLUMNS FROM products LIKE "state"'

    // let query = "SELECT title FROM products ORDER BY reserved_date DESC LIMIT 100";
    // let query = "SELECT * FROM products WHERE reserved_date < 1692348732485 AND article_status = 'reservado'"; //Publicaciones en "reservado" eñ último mes
    // let query = "SELECT price, state, article_url FROM products WHERE w_state = 'nuevo' AND article_status = 'vendido' AND w_sub_category = 'Consolas' AND (title LIKE '%switch%' OR description LIKE '%switch%')"; //Publicaciones en "reservado" eñ último mes
    // let query = "SELECT * FROM products WHERE article_status = 'reservado_por_mucho_tiempo'"; //Publicaciones en "reservado" eñ último mes
    // let query = "SELECT price, " +
    //     "CONCAT(" +
    //     "  FLOOR(time_to_sell / (24*60*60*1000)), 'd ', " +
    //     "  FLOOR((time_to_sell % (24*60*60*1000)) / (60*60*1000)), 'h ', " +
    //     "  FLOOR((time_to_sell % (60*60*1000)) / (60*1000)), 'm ', " +
    //     "  FLOOR((time_to_sell % (60*1000)) / 1000), 's'" +
    //     ") AS time_to_sell, " +
    //     "DATE_FORMAT(FROM_UNIXTIME(reserved_date / 1000), '%d/%m/%Y') AS reserved_date, " +
    //     "title, description, article_url " +
    //     "FROM products " +
    //     "WHERE article_status = 'vendido' AND " +
    //     "      w_sub_category = 'Smartphone' AND " +
    //     "      state = 'como nuevo' AND " +
    //     "      w_model = 'iphone 13' " +
    //     "ORDER BY price ASC";

    let query =
      "SELECT p.*, c.id AS category_id, c.name AS category_name, sc.id AS subcategory_id, sc.name AS subcategory_name, pt.id AS product_type_id, pt.name AS product_type_name, m.id AS model_id, m.name AS model_name, b.id AS brand_id, b.name AS brand_name, co.id AS color_id, co.name AS color_name, ptags.id AS ptag_id, ptags.tag_id AS tag_id, t.name AS tag_name, ps.id AS ps_id, ps.spec_id AS spec_id, s.name AS spec_name, pd.id AS pd_id, pd.defect_id AS defect_id, d.name AS defect_name, pe.id AS pe_id, pe.extra_id AS extra_id, e.name AS extra_name FROM products p LEFT JOIN categories c ON p.category_id = c.id LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id LEFT JOIN product_types pt ON p.product_type_id = pt.id LEFT JOIN models m ON p.model_id = m.id LEFT JOIN brands b ON p.brand_id = b.id LEFT JOIN colors co ON p.color_id = co.id LEFT JOIN products_tags ptags ON p.id = ptags.product_id LEFT JOIN tags t ON ptags.tag_id = t.id LEFT JOIN products_specs ps ON p.id = ps.product_id LEFT JOIN specs s ON ps.spec_id = s.id LEFT JOIN products_defects pd ON p.id = pd.product_id LEFT JOIN defects d ON pd.defect_id = d.id LEFT JOIN products_extras pe ON p.id = pe.product_id LEFT JOIN extras e ON pe.extra_id = e.id WHERE 1 AND p.category_id IN (16000) AND w_brand = 'apple' AND p.color_id = 1 ORDER BY reserved_date DESC";

    // PARA GRÁFICOS
    // let query = "SELECT HOUR(FROM_UNIXTIME(reserved_date/1000)) as hora, COUNT(*) as cantidad_productos FROM products GROUP BY hora ORDER BY hora;"; //Obtener número total de reservados por cada hora del día para gragicos
    // let query = "SELECT CASE WHEN DAYOFWEEK(FROM_UNIXTIME(reserved_date/1000)) = 1 THEN 'Domingo' WHEN DAYOFWEEK(FROM_UNIXTIME(reserved_date/1000)) = 2 THEN 'Lunes' WHEN DAYOFWEEK(FROM_UNIXTIME(reserved_date/1000)) = 3 THEN 'Martes' WHEN DAYOFWEEK(FROM_UNIXTIME(reserved_date/1000)) = 4 THEN 'Miércoles' WHEN DAYOFWEEK(FROM_UNIXTIME(reserved_date/1000)) = 5 THEN 'Jueves' WHEN DAYOFWEEK(FROM_UNIXTIME(reserved_date/1000)) = 6 THEN 'Viernes' WHEN DAYOFWEEK(FROM_UNIXTIME(reserved_date/1000)) = 7 THEN 'Sábado' END as dia_semana, COUNT(*) as cantidad_productos FROM products GROUP BY dia_semana;"; //Obtener número total de reservados por día de semana (para gragicos)
    // let query = "SELECT category_id, COUNT(*) as cantidad_productos FROM products GROUP BY category_id ORDER BY cantidad_productos DESC;";

    // // Comprueba si existe la query "min_price"
    // if (params.selectedCategoryId) {
    //     query += ` category_id = ${params.selectedCategoryId}`;
    // }

    // Devuelve los resultados de la búqueda
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          'Error al obtener las "sub_categories" con filtros desde la base de datos: ',
          err
        );
        reject(err);
      } else {
        // Devuelvo el objeto que creé
        resolve(results);

        // Imprimo la query que se está mandando para verificar que funciona correctamente
        console.log(query);
      }
    });
  });
};

// Modelo para obtener los datos de los productos con filtros
getFilteredProducts = (filters) => {
  return new Promise((resolve, reject) => {
    let query =
      "SELECT p.*, c.id AS category_id, c.name AS category_name, sc.id AS subcategory_id, sc.name AS subcategory_name, pt.id AS product_type_id, pt.name AS product_type_name, m.id AS model_id, m.name AS model_name, b.id AS brand_id, b.name AS brand_name, co.id AS color_id, co.name AS color_name, ptags.id AS ptag_id, ptags.tag_id AS tag_id, t.name AS tag_name, ps.id AS ps_id, ps.spec_id AS spec_id, s.name AS spec_name, pd.id AS pd_id, pd.defect_id AS defect_id, d.name AS defect_name, pe.id AS pe_id, pe.extra_id AS extra_id, e.name AS extra_name " +
      "FROM products p " +
      "LEFT JOIN categories c ON p.category_id = c.id " +
      "LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id " +
      "LEFT JOIN product_types pt ON p.product_type_id = pt.id " +
      "LEFT JOIN models m ON p.model_id = m.id " +
      "LEFT JOIN brands b ON p.brand_id = b.id " +
      "LEFT JOIN colors co ON p.color_id = co.id " +
      "LEFT JOIN products_tags ptags ON p.id = ptags.product_id " +
      "LEFT JOIN tags t ON ptags.tag_id = t.id " +
      "LEFT JOIN products_specs ps ON p.id = ps.product_id " +
      "LEFT JOIN specs s ON ps.spec_id = s.id " +
      "LEFT JOIN products_defects pd ON p.id = pd.product_id " +
      "LEFT JOIN defects d ON pd.defect_id = d.id " +
      "LEFT JOIN products_extras pe ON p.id = pe.product_id " +
      "LEFT JOIN extras e ON pe.extra_id = e.id " +
      "WHERE ";

    let rows = 100;

    if (
      filters.selectedKeywords ||
      filters.selectedTitleKeywords ||
      filters.selectedDescriptionKeywords
    ) {
      // Comprueba si existe la query "keywords"
      if (filters.selectedKeywords) {
        query += ` (title LIKE '%${filters.selectedKeywords}%' OR description LIKE '%${filters.selectedKeywords}%')`;
      }

      // Comprueba si existe la query "title_keywords"
      if (filters.selectedTitleKeywords) {
        query += ` title LIKE '%${filters.selectedTitleKeywords}%'`;
      }

      // Comprueba si existe la query "description_keywords"
      if (filters.selectedDescriptionKeywords) {
        query += ` description LIKE '%${filters.selectedDescriptionKeywords}%'`;
      }
    } else {
      query += `1`;
    }

    // ORDEN DE CLAUSULAS
    // SELECT => FROM => WHERE => GROUP BY => HAVING => ORDER BY => LIMIT

    // Comprueba si existe la query "category" o múltiples "category"
    if (filters.selectedCategories.length > 0) {
      const categoryIds = filters.selectedCategories.join(",");
      query += ` AND p.category_id IN (${categoryIds})`;
    }

    // Comprueba si existe la query "tags" o múltiples "tags"
    if (filters.selectedTags.length > 0) {
      const tagsIds = filters.selectedTags.join(",");
      query += ` AND EXISTS (SELECT 1 FROM products_tags ptags WHERE p.id = ptags.product_id AND ptags.tag_id IN (${tagsIds}) HAVING COUNT(DISTINCT ptags.tag_id) = ${filters.selectedTags.length} )`;
    }

    // Comprueba si existe la query "specs" o múltiples "specs"
    if (filters.selectedSpecs.length > 0) {
      const specsIds = filters.selectedSpecs.join(",");
      query += ` AND EXISTS (SELECT 1 FROM products_specs ps WHERE p.id = ps.product_id AND ps.spec_id IN (${specsIds}) HAVING COUNT(DISTINCT ps.spec_id) = ${filters.selectedSpecs.length} )`;
    }

    // Comprueba si existe la query "defects" o múltiples "defects"
    if (filters.selectedDefects.length > 0) {
      const defectsIds = filters.selectedDefects.join(",");
      query += ` AND EXISTS (SELECT 1 FROM products_defects pd WHERE p.id = pd.product_id AND pd.defect_id IN (${defectsIds}) HAVING COUNT(DISTINCT pd.defect_id) = ${filters.selectedDefects.length} )`;
    }

    // Comprueba si existe la query "extras" o múltiples "extras"
    if (filters.selectedExtras.length > 0) {
      const extrasIds = filters.selectedExtras.join(", ");
      query += ` AND EXISTS (SELECT 1 FROM products_extras pe WHERE p.id = pe.product_id AND pe.extra_id IN (${extrasIds}) HAVING COUNT(DISTINCT pe.extra_id) = ${filters.selectedExtras.length} )`;
    }

    // // Comprueba si existe la query "tags" o múltiples "tags"
    // if (filters.selectedTags) {

    //     if (filters.selectedTags > 0) {
    //         const tags = filters.selectedTags.join(',');
    //         query += ` AND tags IN (${tags})`;
    //     }

    //     query += ` AND tags = (${filters.selectedTags})`;
    // }

    // Comprueba si existe la query "id"
    if (filters.selectedId) {
      query += ` AND p.id= ${db.escape(filters.selectedId)}`;
    }

    // Comprueba si existe la query "article_id"
    if (filters.selectedArticleId) {
      query += ` AND p.article_id= ${db.escape(filters.selectedArticleId)}`;
    }

    // Comprueba si existe la query "min_time_to_sell"
    if (filters.selectedMinTimeToSell) {
      query += ` AND time_to_sell >= ${db.escape(
        filters.selectedMinTimeToSell
      )}`;
    }

    // Comprueba si existe la query "max_time_to_sell"
    if (filters.selectedMaxTimeToSell) {
      query += ` AND time_to_sell <= ${filters.selectedMaxTimeToSell}`;
    }

    // Comprueba si existe la query "min_creation_date"
    if (filters.selectedMinCreationDate) {
      query += ` AND creation_date >= ${db.escape(
        filters.selectedMinCreationDate
      )}`;
    }

    // Comprueba si existe la query "min_creation_date"
    if (filters.selectedMaxCreationDate) {
      query += ` AND creation_date <= ${filters.selectedMinCreationDate}`;
    }

    // Comprueba si existe la query "reserved_date"
    if (filters.selectedMinReservedDate) {
      query += ` AND reserved_date >= ${db.escape(
        filters.selectedMinReservedDate
      )}`;
    }

    // Comprueba si existe la query "reserved_date"
    if (filters.selectedMaxReservedDate) {
      query += ` AND reserved_date <= ${db.escape(
        filters.selectedMaxReservedDate
      )}`;
    }

    // Comprueba si existe la query "reserved_date"
    if (filters.selectedMinViews) {
      query += ` AND views >= ${db.escape(filters.selectedMinViews)}`;
    }

    // Comprueba si existe la query "reserved_date"
    if (filters.selectedMaxViews) {
      query += ` AND views <= ${db.escape(filters.selectedMaxViews)}`;
    }

    // Comprueba si existe la query "reserved_date"
    if (filters.selectedMinFavorites) {
      query += ` AND favorites >= ${db.escape(filters.selectedMinFavorites)}`;
    }

    // Comprueba si existe la query "reserved_date"
    if (filters.selectedMaxFavorites) {
      query += ` AND favorites <= ${db.escape(filters.selectedMaxFavorites)}`;
    }

    // Comprueba si existe la query "sale_date"
    if (filters.selectedMinSaleDate) {
      query += ` AND sale_date >= ${db.escape(filters.selectedMinSaleDate)}`;
    }

    // Comprueba si existe la query "sale_date"
    if (filters.selectedMaxSaleDate) {
      query += ` AND sale_date <= ${db.escape(filters.selectedMaxSaleDate)}`;
    }

    // Comprueba si existe la query "user_id"
    if (filters.selectedUserId) {
      query += ` AND user_id = ${db.escape(filters.selectedUserId)}`;
    }

    // Comprueba si existe la query "allows_shipping"
    if (filters.selectedAllowsShipping) {
      query += ` AND allows_shipping = ${db.escape(
        filters.selectedAllowsShipping
      )}`;
    }

    // Comprueba si existe la query "free_shipping"
    if (filters.selectedFreeShipping) {
      query += ` AND free_shipping = ${db.escape(
        filters.selectedFreeShipping
      )}`;
    }

    // Comprueba si existe la query "city"
    if (filters.selectedCity) {
      query += ` AND city = ${db.escape(filters.selectedCity)}`;
    }

    // Comprueba si existe la query "postal_code"
    if (filters.selectedPostalCode) {
      query += ` AND postal_code = ${db.escape(filters.selectedPostalCode)}`;
    }

    // Comprueba si existe la query "article_status"
    if (filters.selectedArticleStatus) {
      query += ` AND article_status = ${db.escape(
        filters.selectedArticleStatus
      )}`;
    }

    // Comprueba si existe la query "free_shipping"
    if (filters.selectedWBrand) {
      query += ` AND w_brand = ${db.escape(filters.selectedWBrand)}`;
    }

    // Comprueba si existe la query "city"
    if (filters.selectedWModel) {
      query += ` AND w_model = ${db.escape(filters.selectedWModel)}`;
    }

    // Comprueba si existe la query "w_sub_category"
    if (filters.selectedWSubCategory) {
      query += ` AND w_sub_category = ${db.escape(
        filters.selectedWSubCategory
      )}`;
    }

    // Comprueba si existe la query "w_sub_category"
    if (filters.selectedWSubSubCategory) {
      query += ` AND w_sub_sub_category = ${db.escape(
        filters.selectedWSubSubCategory
      )}`;
    }

    // Comprueba si existe la query "state"✅
    if (filters.selectedState) {
      query += ` AND p.state = ${db.escape(filters.selectedState)}`;
    }

    // Comprueba si existe la query "real_state" ✅
    if (filters.selectedRealState) {
      query += ` AND p.real_state = ${db.escape(filters.selectedRealState)}`;
    }

    // Comprueba si existe la query "sub_category_id" ✅
    if (filters.selectedSubCategoryId) {
      query += ` AND p.sub_category_id = ${filters.selectedSubCategoryId}`;
    }

    // Comprueba si existe la query "brand_id" ✅
    if (filters.selectedBrandId) {
      query += ` AND p.brand_id = ${filters.selectedBrandId}`;
    }

    // Comprueba si existe la query "product_type_id" ✅
    if (filters.selectedProductTypeId) {
      query += ` AND p.product_type_id = ${filters.selectedProductTypeId}`;
    }

    // Comprueba si existe la query "model_id" ✅
    if (filters.selectedModelId) {
      query += ` AND p.model_id = ${filters.selectedModelId}`;
    }

    // Comprueba si existe la query "color_id" ✅
    if (filters.selectedColorId) {
      query += ` AND p.color_id = ${filters.selectedColorId}`;
    }

    // Comprueba si existe la query "manual_confirmed" ✅
    if (filters.selectedManualConfirmed) {
      query += ` AND p.manual_confirmed = ${db.escape(
        filters.selectedManualConfirmed
      )}`;
    }

    // Comprueba si existe la query "sold" ✅
    if (filters.selectedSold) {
      query += ` AND sold = ${filters.selectedSold}`;
    }

    // Comprueba si existe la query "min_price"
    if (filters.selectedMinPrice) {
      query += ` AND price >= ${db.escape(filters.selectedMinPrice)}`;
    }

    // Comprueba si existe la query "max_price"
    if (filters.selectedMaxPrice) {
      query += ` AND price <= ${db.escape(filters.selectedMaxPrice)}`;
    }

    // Comprueba si existe la query "distance"
    if (filters.selectedDistance) {
      query += ` AND distance <= ${db.escape(filters.selectedDistance)}`;
    }

    // if (filters.selectedExtras.length > 0) {
    //     const extrasIds = filters.selectedExtras.join(', ');
    //     query += ' GROUP BY p.id ' +
    //         `HAVING COUNT(DISTINCT CASE WHEN pe.extra_id IN (${extrasIds}) THEN pe.extra_id END) = ${filters.selectedExtras.length}`
    // }

    // ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^
    // Agrega otros bloques if para otros filtros que desees implementar
    // ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^

    if (filters.selectedOrder) {
      const defaultOrder = "reserved_date DESC";
      const orders = {
        price_low_to_high: "price ASC",
        price_high_to_low: "price DESC",
        distance_low_to_high: "distance ASC",
        distance_high_to_low: "distance DESC",
        creation_date_low_to_high: "creation_date ASC",
        creation_date_high_to_low: "creation_date DESC",
        reserved_date_low_to_high: "reserved_date ASC",
        reserved_date_high_to_low: "reserved_date DESC",
        time_to_sell_low_to_high: "time_to_sell ASC",
        time_to_sell_high_to_low: "time_to_sell DESC",
      };
      const order = orders[filters.selectedOrder] || defaultOrder;
      query += " ORDER BY " + order;
    } else {
      //Establece por defecto el orden de más nuevo a más antiguo
      query += " ORDER BY reserved_date DESC";
    }

    // Importante, hacer esto antes de aplicar el límite para poder ver todos los resultados
    // Creo esta variable para almacenar el totalResults
    let totalProducts;

    getTotalResults(query)
      .then((results) => {
        // console.log("Continuación del código después de obtener los productos:", results.length);
        totalProducts = results;
      })
      .catch((err) => {
        console.error("Hubo un error al obtener los productos:", err);
      });

    // Comprueba si existe la query "rows"
    if (filters.selectedRows) {
      rows = filters.selectedRows;
    }

    // Comprueba si existe la query "start" y lo calcula con el número de rows establecido
    if (filters.selectedStart) {
      query += ` LIMIT ${rows * filters.selectedStart} ,${rows}`;
    } else {
      //Establece por defecto la primera página
      query += ` LIMIT ${rows * 0} ,${rows}`;
    }

    // Devuelve los resultados de la búqueda
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          "Error al obtener los productos con filtros desde la base de datos: ",
          err
        );
        reject(err);
      } else {
        // Empiezo a crear el objeto que delvolveré con el número total de resultados
        let resultadoFinal = {
          totalResults: totalProducts,
        };

        // Luego le agrego a ese objeto los resultados como "results"
        resultadoFinal["results"] = results.reduce((acc, result) => {
          const {
            ptag_id,
            ps_id,
            pd_id,
            tag_id,
            pe_id,
            tag_name,
            spec_id,
            spec_name,
            defect_id,
            defect_name,
            extra_id,
            extra_name,
            category_id,
            category_name,
            sub_category_id,
            subcategory_id,
            subcategory_name,
            product_type_id,
            product_type_name,
            model_id,
            model_name,
            brand_id,
            brand_name,
            color_id,
            color_name,
            ...rest
          } = result;

          const existingItem = acc.find((item) => item.id === rest.id);
          if (existingItem) {
            if (
              defect_id &&
              defect_name &&
              !existingItem.defects.some((defect) => defect.id === defect_id)
            ) {
              existingItem.defects.push({ id: defect_id, name: defect_name });
            }
            if (
              spec_id &&
              spec_name &&
              !existingItem.specs.some((spec) => spec.id === spec_id)
            ) {
              existingItem.specs.push({ id: spec_id, name: spec_name });
            }
            if (
              tag_id &&
              tag_name &&
              !existingItem.tags.some((tag) => tag.id === tag_id)
            ) {
              existingItem.tags.push({ id: tag_id, name: tag_name });
            }
            if (
              extra_id &&
              extra_name &&
              !existingItem.extras.some((extra) => extra.id === extra_id)
            ) {
              existingItem.extras.push({ id: extra_id, name: extra_name });
            }
          } else {
            const newItem = {
              ...rest,
              category:
                category_id && category_name
                  ? { id: category_id, name: category_name }
                  : {},
              sub_category:
                sub_category_id && subcategory_name
                  ? { id: sub_category_id, name: subcategory_name }
                  : {},
              product_type:
                product_type_id && product_type_name
                  ? { id: product_type_id, name: product_type_name }
                  : {},
              brand:
                brand_id && brand_name
                  ? { id: brand_id, name: brand_name }
                  : {},
              model:
                model_id && model_name
                  ? { id: model_id, name: model_name }
                  : {},
              color:
                color_id && color_name
                  ? { id: color_id, name: color_name }
                  : {},

              tags: tag_id && tag_name ? [{ id: tag_id, name: tag_name }] : [],
              specs:
                spec_id && spec_name ? [{ id: spec_id, name: spec_name }] : [],
              defects:
                defect_id && defect_name
                  ? [{ id: defect_id, name: defect_name }]
                  : [],
              extras:
                extra_id && extra_name
                  ? [{ id: extra_id, name: extra_name }]
                  : [],
            };
            acc.push(newItem);
          }
          // console.log(result)
          return acc;
        }, []);

        // delete resultadoFinal.category_id

        // Devuelvo el objeto que creé
        resolve(resultadoFinal);
      }
    });
  });
};

// Modelo para obtener los datos de los productos con filtros
getPrices = (filters) => {
  return new Promise((resolve, reject) => {
    let query =
      "SELECT AVG(p.price) AS precio_promedio, COUNT(DISTINCT p.id) AS totalResults, JSON_ARRAYAGG(JSON_OBJECT('id', p.id, 'title', p.title)) AS productos " +
      "FROM products p " +
      "WHERE p.id IN (" +
      "SELECT pt1.product_id " +
      "FROM products_tags pt1 " +
      "JOIN products_specs ps1 ON pt1.product_id = ps1.product_id " +
      "JOIN products_defects pd1 ON pt1.product_id = pd1.product_id " + //esto se añade por cada filtro múltiple
      "WHERE pt1.tag_id IN (1, 2) AND ps1.spec_id IN (3, 4) AND pd1.defect_id IN (1)" + //esto se añade por cada filtro múltiple y no múltiple
      "GROUP BY pt1.product_id " +
      "HAVING COUNT(DISTINCT pt1.tag_id) = 2 AND COUNT(DISTINCT ps1.spec_id) = 2 AND COUNT(DISTINCT pd1.defect_id) = 1 " + //esto se añade por cada filtro múltiple
      ") " +
      "AND p.id NOT IN ( " +
      "SELECT pt2.product_id " +
      "FROM products_tags pt2 " +
      "JOIN products_specs ps2 ON pt2.product_id = ps2.product_id " +
      "JOIN products_defects pd2 ON pt2.product_id = pd2.product_id " +
      "WHERE (pt2.tag_id NOT IN (1, 2) OR ps2.spec_id NOT IN (3, 4) OR pd2.defect_id NOT IN (1)) " +
      ");";

    db.query(query, (err, results) => {
      if (err) {
        console.error(
          'Error al obtener los "proces" con filtros desde la base de datos: ',
          err
        );
        reject(err);
      } else {
        // Devuelvo el objeto que creé
        resolve(results);

        // Imprimo la query que se está mandando para verificar que funciona correctamente
        console.log(query);
      }
    });

    // let rows = 100;

    // if (filters.selectedKeywords || filters.selectedTitleKeywords || filters.selectedDescriptionKeywords) {
    //     // Comprueba si existe la query "keywords"
    //     if (filters.selectedKeywords) { query += ` (title LIKE '%${filters.selectedKeywords}%' OR description LIKE '%${filters.selectedKeywords}%')`; }

    //     // Comprueba si existe la query "title_keywords"
    //     if (filters.selectedTitleKeywords) { query += ` title LIKE '%${filters.selectedTitleKeywords}%'`; }

    //     // Comprueba si existe la query "description_keywords"
    //     if (filters.selectedDescriptionKeywords) { query += ` description LIKE '%${filters.selectedDescriptionKeywords}%'`; }

    // } else {
    //     query += `1`;
    // }

    // // ORDEN DE CLAUSULAS
    // // SELECT => FROM => WHERE => GROUP BY => HAVING => ORDER BY => LIMIT

    // // Comprueba si existe la query "category" o múltiples "category"
    // if (filters.selectedCategories.length > 0) {
    //     const categoryIds = filters.selectedCategories.join(',');
    //     query += ` AND p.category_id IN (${categoryIds})`;
    // }

    // // Comprueba si existe la query "tags" o múltiples "tags"
    // if (filters.selectedTags.length > 0) {
    //     const tagsIds = filters.selectedTags.join(',');
    //     query += ` AND ptags.tag_id IN (${tagsIds})`;
    // }

    // // Comprueba si existe la query "specs" o múltiples "specs"
    // if (filters.selectedSpecs.length > 0) {
    //     const specsIds = filters.selectedSpecs.join(',');
    //     query += ` AND ps.spec_id IN (${specsIds})`;
    // }

    // // Comprueba si existe la query "defects" o múltiples "defects"
    // if (filters.selectedDefects.length > 0) {
    //     const defectsIds = filters.selectedDefects.join(',');
    //     query += ` AND pd.defect_id IN (${defectsIds})`;
    // }

    // // // Comprueba si existe la query "extras" o múltiples "extras"
    // // if (filters.selectedExtras.length > 0) {
    // //     const extrasIds = filters.selectedExtras.join(', ');
    // //     query += ` AND pe.extra_id IN (${extrasIds})`;
    // // }

    // // // Comprueba si existe la query "tags" o múltiples "tags"
    // // if (filters.selectedTags) {

    // //     if (filters.selectedTags > 0) {
    // //         const tags = filters.selectedTags.join(',');
    // //         query += ` AND tags IN (${tags})`;
    // //     }

    // //     query += ` AND tags = (${filters.selectedTags})`;
    // // }

    // // Comprueba si existe la query "state"✅
    // if (filters.selectedState) { query += ` AND p.state = ${db.escape(filters.selectedState)}`; }

    // // Comprueba si existe la query "real_state" ✅
    // if (filters.selectedRealState) { query += ` AND p.real_state = ${db.escape(filters.selectedRealState)}`; }

    // // Comprueba si existe la query "sub_category_id" ✅
    // if (filters.selectedSubCategoryId) { query += ` AND p.sub_category_id = ${db.escape(filters.selectedSubCategoryId)}`; }

    // // Comprueba si existe la query "brand_id" ✅
    // if (filters.selectedBrandId) { query += ` AND p.brand_id = ${db.escape(filters.selectedBrandId)}`; }

    // // Comprueba si existe la query "product_type_id" ✅
    // if (filters.selectedProductTypeId) { query += ` AND p.product_type_id = ${filters.selectedProductTypeId}`; }

    // // Comprueba si existe la query "model_id" ✅
    // if (filters.selectedModelId) { query += ` AND p.model_id = ${db.escape(filters.selectedModelId)}`; }

    // // Comprueba si existe la query "color_id" ✅
    // if (filters.selectedColorId) { query += ` AND p.color_id = ${db.escape(filters.selectedColorId)}`; }

    // // Comprueba si existe la query "manual_confirmed" ✅
    // if (filters.selectedManualConfirmed) { query += ` AND p.manual_confirmed = ${db.escape(filters.selectedManualConfirmed)}`; }

    // // Comprueba si existe la query "sold" ✅
    // if (filters.selectedSold) { query += ` AND sold = ${filters.selectedSold}`; }

    // // Comprueba si existe la query "min_price"
    // if (filters.selectedMinPrice) { query += ` AND price >= ${db.escape(filters.selectedMinPrice)}`; }

    // // Comprueba si existe la query "max_price"
    // if (filters.selectedMaxPrice) { query += ` AND price <= ${db.escape(filters.selectedMaxPrice)}`; }

    // // Comprueba si existe la query "distance"
    // if (filters.selectedDistance) { query += ` AND distance <= ${db.escape(filters.selectedDistance)}`; }

    // if (filters.selectedExtras.length > 0) {
    //     const extrasIds = filters.selectedExtras.join(', ');
    //     query += ` AND pe.extra_id = 4 AND NOT EXISTS ( SELECT 1 FROM products_extras pe2 WHERE pe2.product_id = p.id AND pe2.extra_id <> ${extrasIds} )`
    // }

    // // ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^
    // // Agrega otros bloques if para otros filtros que desees implementar
    // // ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^

    // if (filters.selectedOrder) {
    //     const defaultOrder = "reserved_date DESC"
    //     const orders = {
    //         price_low_to_high: 'price ASC',
    //         price_high_to_low: 'price DESC',
    //         distance_low_to_high: 'distance ASC',
    //         distance_high_to_low: 'distance DESC',
    //         creation_date_low_to_high: 'creation_date ASC',
    //         creation_date_high_to_low: 'creation_date DESC',
    //         reserved_date_low_to_high: 'reserved_date ASC',
    //         reserved_date_high_to_low: 'reserved_date DESC',
    //         time_to_sell_low_to_high: 'time_to_sell ASC',
    //         time_to_sell_high_to_low: 'time_to_sell DESC',
    //     }
    //     const order = orders[filters.selectedOrder] || defaultOrder
    //     query += ' ORDER BY ' + order;
    // } else { //Establece por defecto el orden de más nuevo a más antiguo
    //     query += ' ORDER BY reserved_date DESC';
    // }

    // // Importante, hacer esto antes de aplicar el límite para poder ver todos los resultados
    // // Creo esta variable para almacenar el totalResults
    // let totalProducts;

    // getTotalResults(query)
    //     .then((results) => {
    //         // console.log("Continuación del código después de obtener los productos:", results.length);
    //         totalProducts = results;
    //     })
    //     .catch((err) => {
    //         console.error("Hubo un error al obtener los productos:", err);
    //     });

    // // Comprueba si existe la query "rows"
    // if (filters.selectedRows) { rows = filters.selectedRows; }

    // // Comprueba si existe la query "start" y lo calcula con el número de rows establecido
    // if (filters.selectedStart) {
    //     query += ` LIMIT ${rows * filters.selectedStart} ,${(rows)}`;
    // } else { //Establece por defecto la primera página
    //     query += ` LIMIT ${rows * 0} ,${(rows)}`;
    // }

    // // Devuelve los resultados de la búqueda
    // db.query(query, (err, results) => {
    //     if (err) {
    //         console.error('Error al obtener los productos con filtros desde la base de datos: ', err);
    //         reject(err);
    //     } else {
    //         // Empiezo a crear el objeto que delvolveré con el número total de resultados
    //         let resultadoFinal = {
    //             'totalResults': totalProducts
    //         }

    //         // Luego le agrego a ese objeto los resultados como "results"
    //         resultadoFinal["results"] = results.reduce((acc, result) => {
    //             const {
    //                 ptag_id, ps_id, pd_id, tag_id, pe_id, tag_name, spec_id, spec_name, defect_id, defect_name, extra_id, extra_name,
    //                 category_id, category_name, sub_category_id, subcategory_id, subcategory_name,
    //                 product_type_id, product_type_name, model_id, model_name,
    //                 brand_id, brand_name, color_id, color_name,
    //                 ...rest
    //             } = result;

    //             const existingItem = acc.find(item => item.id === rest.id);
    //             if (existingItem) {
    //                 if (defect_id && defect_name && !existingItem.defects.some(defect => defect.id === defect_id)) {
    //                     existingItem.defects.push({ id: defect_id, name: defect_name });
    //                 }
    //                 if (spec_id && spec_name && !existingItem.specs.some(spec => spec.id === spec_id)) {
    //                     existingItem.specs.push({ id: spec_id, name: spec_name });
    //                 }
    //                 if (tag_id && tag_name && !existingItem.tags.some(tag => tag.id === tag_id)) {
    //                     existingItem.tags.push({ id: tag_id, name: tag_name });
    //                 }
    //                 if (extra_id && extra_name && !existingItem.extras.some(extra => extra.id === extra_id)) {
    //                     existingItem.extras.push({ id: extra_id, name: extra_name });
    //                 }
    //             } else {
    //                 const newItem = {
    //                     ...rest,
    //                     category: category_id && category_name ? { id: category_id, name: category_name } : {},
    //                     sub_category: sub_category_id && subcategory_name ? { id: sub_category_id, name: subcategory_name } : {},
    //                     product_type: product_type_id && product_type_name ? { id: product_type_id, name: product_type_name } : {},
    //                     brand: brand_id && brand_name ? { id: brand_id, name: brand_name } : {},
    //                     model: model_id && model_name ? { id: model_id, name: model_name } : {},
    //                     color: color_id && color_name ? { id: color_id, name: color_name } : {},

    //                     tags: tag_id && tag_name ? [{ id: tag_id, name: tag_name }] : [],
    //                     specs: spec_id && spec_name ? [{ id: spec_id, name: spec_name }] : [],
    //                     defects: defect_id && defect_name ? [{ id: defect_id, name: defect_name }] : [],
    //                     extras: extra_id && extra_name ? [{ id: extra_id, name: extra_name }] : []
    //                 };
    //                 acc.push(newItem);
    //             }
    //             // console.log(result)
    //             return acc;

    //         }, []);

    //         // delete resultadoFinal.category_id

    //         // Devuelvo el objeto que creé
    //         resolve(resultadoFinal);

    //     }
    // });
  });
};

// Función para obtener el total de resultados con la búsqueda
function getTotalResults(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          "Error al obtener los productos con filtros desde la base de datos: ",
          err
        );
        reject(err);
      } else {
        console.log(query);
        // console.log(filters);
        resolve(results.length);
      }
    });
  });
}

// Función para obtener un producto por su ID
getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM products WHERE id = ?";
    db.query(query, [productId], (err, results) => {
      if (err) {
        console.error(
          "Error al obtener el producto desde la base de datos: ",
          err
        );
        reject(err);
      } else {
        if (results.length === 0) {
          resolve(null); // Si no se encuentra el producto, resuelve con null
        } else {
          const product = results[0];
          resolve(product);
        }
      }
    });
  });
};

// Modelo para editar los datos de los productos
editProduct = (params) => {
  return new Promise((resolve, reject) => {
    let updateQuery = "UPDATE products SET";

    let firstItem = true;

    console.log("[estoy en el edit, dentro de model]");
    console.log("parametros pasados: " + JSON.stringify(params));

    // Comprueba si existe el parametro "category_id" y compruba si es el primer valor agregadoa la updateQuery
    if (params.selectedCategoryId !== undefined) {
      firstItem ? (firstItem = false) : (updateQuery += " ,");
      updateQuery += ` category_id = ${params.selectedCategoryId}`;
    }

    // Comprueba si existe el parametro "manual_confirmed" y compruba si es el primer valor agregadoa la updateQuery
    if (params.selectedBrandId !== undefined) {
      firstItem ? (firstItem = false) : (updateQuery += " ,");
      updateQuery += ` brand_id = ${params.selectedBrandId}`;
    }

    // Comprueba si existe el parametro "manual_confirmed" y compruba si es el primer valor agregadoa la updateQuery
    if (
      params.selectedManualConfirmed !== null &&
      params.selectedManualConfirmed !== undefined
    ) {
      firstItem ? (firstItem = false) : (updateQuery += " ,");
      updateQuery += ` manual_confirmed = '${params.selectedManualConfirmed}'`;
    }

    // // Comprueba si existe el parametro "tags" y compruba si es el primer valor agregadoa la updateQuery
    // if (params.selectedTags !== null && params.selectedTags !== undefined) {
    //     firstItem ? firstItem = false : updateQuery += ' ,';
    //     const tags = params.selectedTags.join(',');
    //     updateQuery += ` tags = (${tags})`;
    // }

    // Comprueba si existe el parametro "product_type" y compruba si es el primer valor agregadoa la updateQuery
    if (params.selectedProductTypeId !== undefined) {
      firstItem ? (firstItem = false) : (updateQuery += " ,");
      updateQuery += ` product_type_id = ${params.selectedProductTypeId}`;
    }

    // Comprueba si existe el parametro "state" y compruba si es el primer valor agregadoa la updateQuery
    if (params.selectedState !== null && params.selectedState !== undefined) {
      firstItem ? (firstItem = false) : (updateQuery += " ,");

      // Aquí tengo que hacer algo especial ya que no puedo pasar el valor null, asi que paso "null" como string y establezco el valor
      params.selectedState == "null"
        ? (updateQuery += ` state = ${null}`)
        : (updateQuery += ` state = '${params.selectedState}'`);
    }

    // Comprueba si existe el parametro "real_state" y compruba si es el primer valor agregadoa la updateQuery
    if (
      params.selectedRealState !== null &&
      params.selectedRealState !== undefined
    ) {
      firstItem ? (firstItem = false) : (updateQuery += " ,");

      // Aquí tengo que hacer algo especial ya que no puedo pasar el valor null, asi que paso "null" como string y establezco el valor
      params.selectedRealState == "null"
        ? (updateQuery += ` real_state = ${null}`)
        : (updateQuery += ` real_state = '${params.selectedRealState}'`);
    }

    // Comprueba si existe el parametro "sub_category" y compruba si es el primer valor agregadoa la updateQuery
    if (params.selectedSubCategoryId !== undefined) {
      firstItem ? (firstItem = false) : (updateQuery += " ,");
      updateQuery += ` sub_category_id = ${params.selectedSubCategoryId}`;
    }

    // Comprueba si existe el parametro "sub_sub_category" y compruba si es el primer valor agregadoa la updateQuery
    if (params.selectedSubSubCategory !== undefined) {
      firstItem ? (firstItem = false) : (updateQuery += " ,");
      updateQuery += ` sub_sub_category_id = ${params.selectedSubCategory}`;
    }

    // Comprueba si existe el parametro "sold" y compruba si es el primer valor agregadoa la updateQuery
    if (params.selectedSold !== null && params.selectedSold !== undefined) {
      firstItem ? (firstItem = false) : (updateQuery += " ,");
      updateQuery += ` sold = ${params.selectedSold}`;
    }

    // Comprueba si existe el parametro "model" y compruba si es el primer valor agregadoa la updateQuery
    if (params.selectedModelId !== undefined) {
      firstItem ? (firstItem = false) : (updateQuery += " ,");
      updateQuery += ` model_id = ${params.selectedModelId}`;
    }

    // Comprueba si existe el parametro "specs" y compruba si es el primer valor agregadoa la updateQuery
    if (params.selectedSpecs !== undefined) {
      firstItem ? (firstItem = false) : (updateQuery += " ,");
      updateQuery += ` specs = '${params.selectedSpecs}'`;
    }

    // Comprueba si existe el parametro "color" y compruba si es el primer valor agregadoa la updateQuery
    if (params.selectedColorId !== undefined) {
      firstItem ? (firstItem = false) : (updateQuery += " ,");
      updateQuery += ` color_id = ${params.selectedColorId}`;
    }

    // Comprueba si existe el parametro "defects" y compruba si es el primer valor agregadoa la updateQuery
    if (params.selectedDefects !== undefined) {
      firstItem ? (firstItem = false) : (updateQuery += " ,");
      updateQuery += ` defects = '${params.selectedDefects}'`;
    }

    // Comprueba si existe el parametro "extra" y compruba si es el primer valor agregadoa la updateQuery
    if (params.selectedExtras !== undefined) {
      firstItem ? (firstItem = false) : (updateQuery += " ,");
      updateQuery += ` extras = '${params.selectedExtras}'`;
    }

    // ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^
    // Agrega otros bloques if para otros filtros que desees implementar
    // ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^

    // De último agrega la id
    if (params.selectedProductId) {
      updateQuery += ` WHERE id = ${params.selectedProductId};`;
    }

    // Devuelve los resultados de la búqueda
    db.query(updateQuery, (err, results) => {
      if (err) {
        console.error(
          "Error al obtener los productos con filtros desde la base de datos: ",
          err
        );
        reject(err);
      } else {
        // Devuelvo el objeto
        resolve("agregado los updates correctamente");

        // Imprimo la updateQuery que se está mandando para verificar que funciona correctamente
        console.log("update: " + updateQuery);
      }
    });

    // INSERTS A OTRAS TABLAS RELACIONADAS
    const product_id = params.selectedProductId;

    function deleteAndInsertData(
      table,
      idField,
      selectedData,
      resolve,
      reject
    ) {
      // Elimina todos los registros con el product_id
      db.query(
        `DELETE FROM ${table} WHERE product_id = ?`,
        [params.selectedProductId],
        (err, result) => {
          if (err) {
            return db.rollback(() => {
              throw err;
            });
          }

          if (selectedData.length > 0) {
            const values = selectedData
              .map((dataId) => `(${params.selectedProductId}, ${dataId})`)
              .join(", ");

            const query = `INSERT INTO ${table} (product_id, ${idField}) VALUES ${values};`;

            db.query(query, (err, results) => {
              if (err) {
                console.error(
                  "Error al obtener los productos con filtros desde la base de datos: ",
                  err
                );
                reject(err);
              } else {
                resolve(`agregados los ${table} correctamente`);
              }
            });
          } else {
            resolve(`no se agregaron nuevos ${table}`);
          }
        }
      );
    }

    // TAGS
    deleteAndInsertData(
      "products_tags",
      "tag_id",
      params.selectedTags,
      resolve,
      reject
    );

    // SPECS
    deleteAndInsertData(
      "products_specs",
      "spec_id",
      params.selectedSpecs,
      resolve,
      reject
    );

    // DEFECTS
    deleteAndInsertData(
      "products_defects",
      "defect_id",
      params.selectedDefects,
      resolve,
      reject
    );

    // EXTRAS
    deleteAndInsertData(
      "products_extras",
      "extra_id",
      params.selectedExtras,
      resolve,
      reject
    );
  });
};

// Modelo para obtener los datos de los productos con filtros
getCategories = (params) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM categories";

    // // Comprueba si existe la query "min_price"
    // if (params.selectedCategoryId) {
    //     query += ` category_id = ${params.selectedCategoryId}`;
    // }

    // Devuelve los resultados de la búqueda
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          'Error al obtener las "sub_categories" con filtros desde la base de datos: ',
          err
        );
        reject(err);
      } else {
        // Devuelvo el objeto que creé
        resolve(results);

        // Imprimo la query que se está mandando para verificar que funciona correctamente
        console.log(query);
      }
    });
  });
};

// Modelo para obtener los datos de los productos con filtros
getSubCategories = (params) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM sub_categories WHERE 1";

    // Comprueba si existe la query "min_price"
    if (params.selectedCategoryId) {
      query += ` AND category_id = ${params.selectedCategoryId}`;
    }

    // Devuelve los resultados de la búqueda
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          'Error al obtener las "sub_categories" con filtros desde la base de datos: ',
          err
        );
        reject(err);
      } else {
        // Devuelvo el objeto que creé
        resolve(results);

        // Imprimo la query que se está mandando para verificar que funciona correctamente
        console.log(query);
      }
    });
  });
};

// Modelo para obtener los datos de los productos con filtros
getModels = (params) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM models WHERE 1";

    // Comprueba si existe la query "min_price"
    if (params.selectedProductTypeId) {
      query += ` AND product_type_id = ${params.selectedProductTypeId}`;
    }

    // Devuelve los resultados de la búqueda
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          'Error al obtener los "models" desde la base de datos: ',
          err
        );
        reject(err);
      } else {
        // Devuelvo el objeto que creé
        resolve(results);

        // Imprimo la query que se está mandando para verificar que funciona correctamente
        console.log(query);
      }
    });
  });
};

// Modelo para obtener los datos de los productos con filtros
getProductTypes = (params) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM product_types WHERE 1";
    // let firstItem = true;

    // Comprueba si existe la query "sub_category_id"
    if (params.selectedSubCategoryId) {
      // firstItem ? firstItem = false : query += ' AND';
      query += ` AND sub_category_id = ${params.selectedSubCategoryId}`;
    }

    // Comprueba si existe la query "brand_id"
    if (params.selectedBrandId) {
      // firstItem ? firstItem = false : query += ' AND';
      query += ` AND brand_id = ${params.selectedBrandId}`;
    }

    // Devuelve los resultados de la búqueda
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          'Error al obtener los "product_types" desde la base de datos: ',
          err
        );
        reject(err);
      } else {
        // Devuelvo el objeto que creé
        resolve(results);

        // Imprimo la query que se está mandando para verificar que funciona correctamente
        console.log(query);
      }
    });
  });
};

// Modelo para obtener las brands por sub categoría
getBrands = (params) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM brands WHERE 1";

    // Comprueba si existe la query "min_price"
    if (params.selectedCategoryId) {
      query += ` AND category_id IS NULL OR category_id = ${params.selectedCategoryId}`;
    }

    // Devuelve los resultados de la búqueda
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          'Error al obtener las "brands" desde la base de datos: ',
          err
        );
        reject(err);
      } else {
        resolve(results);

        // Imprimo la query que se está mandando para verificar que funciona correctamente
        console.log(query);
      }
    });
  });
};

// Modelo para obtener los colors por sub categoría
getColors = (params) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM colors WHERE 1";

    // Comprueba si existe la query "min_price"
    if (params.selectedSubCategoryId) {
      query += ` AND sub_category_id IS NULL OR sub_category_id = ${params.selectedSubCategoryId}`;
    }

    // Devuelve los resultados de la búqueda
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          'Error al obtener los "colors" desde la base de datos: ',
          err
        );
        reject(err);
      } else {
        resolve(results);

        // Imprimo la query que se está mandando para verificar que funciona correctamente
        console.log(query);
      }
    });
  });
};

// Modelo para obtener las tags por sub categoría
getTags = (params) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM tags WHERE 1";

    // Comprueba si existe la query "min_price"
    if (params.selectedSubCategoryId) {
      query += ` AND sub_category_id IS NULL OR sub_category_id = ${params.selectedSubCategoryId}`;
    }

    // Devuelve los resultados de la búqueda
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          'Error al obtener las "tags" desde la base de datos: ',
          err
        );
        reject(err);
      } else {
        resolve(results);

        // Imprimo la query que se está mandando para verificar que funciona correctamente
        console.log(query);
      }
    });
  });
};

// Modelo para obtener los specs por sub categoría
getSpecs = (params) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM specs WHERE 1";

    // Comprueba si existe la query "selectedSubCategoryId"
    if (params.selectedSubCategoryId && params.selectedModelId == null) {
      query += ` AND sub_category_id IS NULL OR sub_category_id = ${params.selectedSubCategoryId}`;
    }

    // Comprueba si existe la query "selectedModelId"
    if (params.selectedModelId) {
      query += ` AND sub_category_id IS NULL OR id IN (SELECT spec_id FROM models_specs WHERE model_id = ${params.selectedModelId})`;
    }

    // Devuelve los resultados de la búsqueda
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          'Error al obtener los "specs" desde la base de datos: ',
          err
        );
        reject(err);
      } else {
        resolve(results);

        // Imprimo la query que se está mandando para verificar que funciona correctamente
        console.log(query);
      }
    });
  });
};

// Modelo para obtener los defects por sub categoría
getDefects = (params) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM defects WHERE 1";

    // Comprueba si existe la query "min_price"
    if (params.selectedSubCategoryId) {
      query += ` AND sub_category_id IS NULL OR sub_category_id = ${params.selectedSubCategoryId}`;
    }

    // Devuelve los resultados de la búqueda
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          'Error al obtener los "defects" desde la base de datos: ',
          err
        );
        reject(err);
      } else {
        resolve(results);

        // Imprimo la query que se está mandando para verificar que funciona correctamente
        console.log(query);
      }
    });
  });
};

// Modelo para obtener los extras por sub categoría
getExtras = (params) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM extras WHERE 1";

    // Comprueba si existe la query "min_price"
    if (params.selectedSubCategoryId) {
      query += ` AND sub_category_id IS NULL OR sub_category_id = ${params.selectedSubCategoryId}`;
    }

    // Devuelve los resultados de la búqueda
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          'Error al obtener los "extras" desde la base de datos: ',
          err
        );
        reject(err);
      } else {
        resolve(results);

        // Imprimo la query que se está mandando para verificar que funciona correctamente
        console.log(query);
      }
    });
  });
};

async function getOsrsPrices() {
  try {
    const mappingResponse = await axios.get(
      "https://prices.runescape.wiki/api/v1/osrs/mapping"
    );
    const latestResponse = await axios.get(
      "https://prices.runescape.wiki/api/v1/osrs/latest"
    );

    const mappingData = mappingResponse.data;
    const latestData = latestResponse.data.data;

    const combinedData = mappingData.map((item) => {
      const id = item.id.toString();
      const { icon, ...rest } = item; // Desestructuramos el objeto para quitar el campo 'icon'
      const image = `https://secure.runescape.com/m=itemdb_oldschool/obj_sprite.gif?id=${id}`; // Nueva URL

      return {
        ...rest, // Usamos 'rest' en lugar de 'item'
        ...latestData[id],
        image, // Añadimos el campo 'image'
      };
    });

    return combinedData;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error al obtener los precios de Osrs");
  }
}

// async function fetchProductPage(articleUrl) {
//     return new Promise((resolve, reject) => {
//         try {
//             axios.get(articleUrl)
//                 .then(response => {
//                     const html = response.data;
//                     const $ = cheerio.load(html);

//                     // let json = $('#__NEXT_DATA__');
//                     // json = JSON.parse(json.html())
//                     // let item = json.props.pageProps.item

//                     item = JSON.parse($('#__NEXT_DATA__').html()).props.pageProps.item

//                     let estadoPublicaion = item.flags.sold == true ? 'vendido' : (item.flags.reserved == true ? 'reservado' : 'des-reservado')
//                     let marca = item.brand
//                     let model = item.model
//                     let estado = item.condition.text
//                     let subCategoria = item.taxonomies.length > 1 ? item.taxonomies[1].name : null
//                     let subSubCategoria = item.taxonomies.length > 2 ? item.taxonomies[2].name : null
//                     let views = item.views
//                     let favorites = item.favorites
//                     let dateSold = estadoPublicaion == 'vendido' ? item.modifiedDate : null
//                     let lastModification = item.modifiedDate

//                     // console.log('El estado de la publicación es: ' + estadoPublicaion)
//                     // console.log('La marca es: ' + marca)
//                     // console.log('El modelo es: ' + model)
//                     // console.log('El estado del producto es: ' + estado)
//                     // console.log('La sub categoría es: ' + subCategoria)
//                     // console.log('La subsub categoría es: ' + subSubCategoria)
//                     // console.log('Visitas: ' + views)
//                     // console.log('Favoritos: ' + favorites)
//                     // console.log('la fecha en la que se vendió: ' + dateSold)

//                     let result = {
//                         'article_status': estadoPublicaion,         //✅
//                         'w_brand': marca,                           //✔
//                         'w_model': model,                           //⭕
//                         'w_state': estado,                          //✅
//                         'w_sub_category': subCategoria,             //✔
//                         'w_sub_sub_category': subSubCategoria,      //✔
//                         'views': views,                             //✅
//                         'favorites': favorites,                     //✅
//                         'sale_date': dateSold,                      //✅
//                         'last_modification': lastModification,

//                     }

//                     resolve(result);

//                 })
//                 .catch(error => {
//                     // console.error('Ha habido un error o el producto ha sido eliminado:');
//                     // console.error(error);
//                     reject('error');
//                 });

//         } catch (error) {
//             console.error('Error:', error);
//         }

//     });
// }

// Modelo para obtener los datos de los productos con filtros
getEnumValuesOfColumn = (params) => {
  return new Promise((resolve, reject) => {
    // let query = "SELECT title FROM products WHERE article_id=nz005nk0qrzo ORDER BY reserved_date DESC LIMIT 100";
    console.log("query");

    let query = `SHOW COLUMNS FROM products LIKE "${params.selectedColumn}"`;

    // Devuelve los resultados de la búqueda
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          `Error al obtener los valores del enum de la columna "${params.selectedColumn}": `,
          err
        );
        reject(err);
      } else {
        console.log(query);

        const enumValues = results[0].Type.match(/'[^']+'/g).map((value) =>
          value.replace(/'/g, "")
        );

        // Devuelvo el objeto que creé
        resolve(enumValues);

        // Imprimo la query que se está mandando para verificar que funciona correctamente
      }
    });
  });
};

getProductsOLD = (filters) => {
  return new Promise((resolve, reject) => {
    const {
      currentPage = 1,
      pageSize = 50,
      orderBy = "reservation_date_desc",
      reserved_since,
      categories = [],
      states = [],
      article_status = [],
      price_range,
      time_to_be_reserved,
      distance_in_km,
      allows_shipping,
      sub_category,
      brand,
      product_type,
      model,
      color,
      tags = [],
      specs = [],
      defects = [],
      extras = [],
      real_state,
      manual_confirmed,
      views,
      favorites,
      postal_codes = [],
      search,
    } = filters;

    const offset = (currentPage - 1) * pageSize;
    let whereClauses = [];

    if (reserved_since) {
      whereClauses.push(
        `p.reserved_date >= UNIX_TIMESTAMP(NOW()) * 1000 - ${reserved_since} * 1000`
      );
    }
    if (categories.length) {
      whereClauses.push(
        `c.name IN (${categories.map((c) => `'${c}'`).join(", ")})`
      );
    }
    if (states.length) {
      whereClauses.push(
        `p.state IN (${states.map((s) => `'${s}'`).join(", ")})`
      );
    }
    if (article_status.length) {
      whereClauses.push(
        `p.status IN (${article_status.map((s) => `'${s}'`).join(", ")})`
      );
    }
    if (price_range) {
      whereClauses.push(
        `p.price BETWEEN ${price_range.min} AND ${price_range.max}`
      );
    }
    if (sub_category) {
      whereClauses.push(`sc.name = '${sub_category}'`);
    }
    if (brand) {
      whereClauses.push(`b.name = '${brand}'`);
    }
    if (product_type) {
      whereClauses.push(`pt.name = '${product_type}'`);
    }
    if (model) {
      whereClauses.push(`m.name = '${model}'`);
    }
    if (color) {
      whereClauses.push(`co.name = '${color}'`);
    }
    if (tags.length) {
      whereClauses.push(`p.id IN (
        SELECT ptags.product_id
        FROM products_tags ptags
        WHERE ptags.tag_id IN (${tags.join(", ")})
        GROUP BY ptags.product_id
        HAVING COUNT(DISTINCT ptags.tag_id) = ${tags.length}
      )`);
    }
    if (specs.length) {
      whereClauses.push(`p.id IN (
        SELECT ps.product_id
        FROM products_specs ps
        WHERE ps.spec_id IN (${specs.join(", ")})
        GROUP BY ps.product_id
        HAVING COUNT(DISTINCT ps.spec_id) = ${specs.length}
      )`);
    }

    if (defects.length) {
      whereClauses.push(`p.id IN (
        SELECT pd.product_id
        FROM products_defects pd
        WHERE pd.defect_id IN (${defects.join(", ")})
        GROUP BY pd.product_id
        HAVING COUNT(DISTINCT pd.defect_id) = ${defects.length}
      )`);
    }

    if (extras.length) {
      whereClauses.push(`p.id IN (
        SELECT pe.product_id
        FROM products_extras pe
        WHERE pe.extra_id IN (${extras.join(", ")})
        GROUP BY pe.product_id
        HAVING COUNT(DISTINCT pe.extra_id) = ${extras.length}
      )`);
    }
    if (specs.length) {
      whereClauses.push(`s.name IN (${specs.map((s) => `'${s}'`).join(", ")})`);
    }
    if (defects.length) {
      whereClauses.push(
        `d.name IN (${defects.map((d) => `'${d}'`).join(", ")})`
      );
    }
    if (extras.length) {
      whereClauses.push(
        `e.name IN (${extras.map((e) => `'${e}'`).join(", ")})`
      );
    }
    if (real_state) {
      whereClauses.push(`p.real_state = '${real_state}'`);
    }
    if (manual_confirmed) {
      whereClauses.push(`p.manual_confirmed = '${manual_confirmed}'`);
    }
    if (views) {
      whereClauses.push(`p.views >= ${views}`);
    }
    if (favorites) {
      whereClauses.push(`p.favorites >= ${favorites}`);
    }
    if (postal_codes.length) {
      whereClauses.push(
        `p.postal_code IN (${postal_codes.map((pc) => `'${pc}'`).join(", ")})`
      );
    }
    if (search) {
      whereClauses.push(
        `(p.title LIKE '%${search}%' OR p.description LIKE '%${search}%')`
      );
    }

    if (time_to_be_reserved) {
      whereClauses.push(`p.time_to_sell <= ${time_to_be_reserved}`);
    }
    if (distance_in_km) {
      whereClauses.push(`p.distance <= ${distance_in_km}`);
    }
    if (allows_shipping !== undefined) {
      whereClauses.push(
        `p.allows_shipping = ${allows_shipping === "true" ? 1 : 0}`
      );
    }

    let whereSQL = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    const dataQuery = `
      SELECT p.id, p.title, p.description, p.price, p.images, p.time_to_sell, p.article_url, p.reserved_date
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id
      LEFT JOIN product_types pt ON p.product_type_id = pt.id
      LEFT JOIN models m ON p.model_id = m.id
      LEFT JOIN brands b ON p.brand_id = b.id
      LEFT JOIN colors co ON p.color_id = co.id
      LEFT JOIN products_tags ptags ON p.id = ptags.product_id
      LEFT JOIN tags t ON ptags.tag_id = t.id
      LEFT JOIN products_specs ps ON p.id = ps.product_id
      LEFT JOIN specs s ON ps.spec_id = s.id
      LEFT JOIN products_defects pd ON p.id = pd.product_id
      LEFT JOIN defects d ON pd.defect_id = d.id
      LEFT JOIN products_extras pe ON p.id = pe.product_id
      LEFT JOIN extras e ON pe.extra_id = e.id
      ${whereSQL}
      ORDER BY p.reserved_date DESC
      LIMIT ${pageSize} OFFSET ${offset};
    `;

    db.query(dataQuery, (err, results) => {
      if (err) {
        console.error("Error en la consulta:", err);
        reject(err);
      } else {
        const products = results.map((product) => ({
          ...product,
          images: JSON.parse(product.images),
        }));
        resolve({ products });
      }
    });
  });
};

getProducts = (filters, getOnlySize = false) => {
  return new Promise((resolve, reject) => {
    const {
      page = 1,
      size = 50,
      order_by = "reservation_date_desc",
      reserved_since,
      categories = [],
      states = [],
      article_status = [],
      price_range,
      time_to_be_reserved,
      distance_in_km,
      allows_shipping,
      sub_category_id,
      brand_id,
      product_type_id,
      model_id,
      color_id,
      tags = [],
      specs = [],
      defects = [],
      extras = [],
      real_state,
      manual_confirmed,
      views,
      favorites,
      postal_codes = [],
      search,
      w_brand,
      w_model,
      w_sub_category,
      w_sub_sub_category,
      advanced_search,
    } = filters;

    const offset = (page - 1) * size;
    let whereClauses = [];

    if (time_to_be_reserved) {
      whereClauses.push(`p.time_to_sell <= ${time_to_be_reserved}`);
    }

    if (categories.length) {
      whereClauses.push(`p.category_id IN (${categories.join(",")})`);
    }

    if (states.length) {
      whereClauses.push(
        `p.state IN (${states.map((state) => `'${state}'`).join(",")})`
      );
    }

    if (article_status.length) {
      whereClauses.push(
        `p.article_status IN (${article_status
          .map((status) => `'${status}'`)
          .join(",")})`
      );
    }

    if (price_range) {
      if (price_range.min && price_range.max) {
        whereClauses.push(
          `p.price BETWEEN ${price_range.min} AND ${price_range.max}`
        );
      } else if (price_range.min) {
        whereClauses.push(`p.price >= ${price_range.min}`);
      } else if (price_range.max) {
        whereClauses.push(`p.price <= ${price_range.max}`);
      }
    }

    if (sub_category_id) {
      whereClauses.push(`p.sub_category_id = ${sub_category_id}`);
    }
    if (brand_id) {
      whereClauses.push(`brand_id = ${brand_id}`);
    }
    if (product_type_id) {
      whereClauses.push(`product_type_id = ${product_type_id}`);
    }
    if (model_id) {
      whereClauses.push(`model_id = ${model_id}`);
    }
    if (allows_shipping) {
      whereClauses.push(`allows_shipping = ${allows_shipping}`);
    }
    if (color_id) {
      whereClauses.push(`color_id = ${color_id}`);
    }

    if (distance_in_km) {
      whereClauses.push(`p.distance <= ${distance_in_km}`);
    }

    if (real_state) {
      whereClauses.push(`real_state = '${real_state}'`);
    }

    if (manual_confirmed) {
      whereClauses.push(`manual_confirmed = '${manual_confirmed}'`);
    }

    if (w_brand) {
      whereClauses.push(`w_brand = '${w_brand}'`);
    }

    if (w_model) {
      whereClauses.push(`w_model = '${w_model}'`);
    }

    if (w_sub_category) {
      whereClauses.push(`w_sub_category = '${w_sub_category}'`);
    }

    if (w_sub_sub_category) {
      whereClauses.push(`w_sub_sub_category = '${w_sub_sub_category}'`);
    }

    // if (reserved_since) {
    //   const now = Date.now(); // Obtener el tiempo actual en milisegundos
    //   const reservedFrom = now - reserved_since; // Calcular la fecha límite
    //   whereClauses.push(`p.reserved_date >= ${reservedFrom}`);
    // }

    if (postal_codes.length) {
      whereClauses.push(
        `p.postal_code IN (${postal_codes
          .map((code) => `'${code}'`)
          .join(",")})`
      );
    }

    if (tags.length) {
      tags.map((tag) =>
        whereClauses.push(
          `EXISTS (SELECT 1 FROM products_tags pt WHERE pt.product_id = p.id AND pt.tag_id IN (${tag})) `
        )
      );
    }

    if (specs.length) {
      specs.map((spec) =>
        whereClauses.push(
          `EXISTS (SELECT 1 FROM products_specs pt WHERE pt.product_id = p.id AND pt.tag_id IN (${spec})) `
        )
      );
    }

    if (specs.defects) {
      defects.map((defect) =>
        whereClauses.push(
          `EXISTS (SELECT 1 FROM products_defects pt WHERE pt.product_id = p.id AND pt.tag_id IN (${defect})) `
        )
      );
    }

    if (specs.extras) {
      extras.map((extra) =>
        whereClauses.push(
          `EXISTS (SELECT 1 FROM products_extras pt WHERE pt.product_id = p.id AND pt.tag_id IN (${extra})) `
        )
      );
    }

    // if (real_state) {
    //   whereClauses.push(`p.real_state = '${real_state}'`);
    // }
    // if (manual_confirmed) {
    //   whereClauses.push(`p.manual_confirmed = '${manual_confirmed}'`);
    // }
    if (views) {
      whereClauses.push(`p.views <= ${views}`);
    }
    if (favorites) {
      whereClauses.push(`p.favorites <= ${favorites}`);
    }
    // if (postal_codes.length) {
    //   whereClauses.push(
    //     `p.postal_code IN (${postal_codes.map((pc) => `'${pc}'`).join(", ")})`
    //   );
    // }
    if (search) {
      whereClauses.push(
        `(p.title LIKE '%${search}%' OR p.description LIKE '%${search}%')`
      );
    }

    if (advanced_search) {
      const { fields, comparasionOperator, text, logicalOperator } =
        advanced_search;
      let advancedConditions = [];

      if (comparasionOperator === "equals") {
        if (fields === "title") {
          advancedConditions.push(`p.title = '${text}'`);
        } else if (fields === "description") {
          advancedConditions.push(`p.description = '${text}'`);
        } else if (
          fields === "titleAndDescription" ||
          fields === "title_and_description"
        ) {
          advancedConditions.push(
            `(p.title = '${text}' OR p.description = '${text}')`
          );
        }
      } else if (comparasionOperator === "contains" && Array.isArray(text)) {
        if (fields === "title") {
          const conditions = text.map((t) => `p.title LIKE '%${t}%'`);
          advancedConditions.push(
            `(${conditions.join(` ${logicalOperator} `)})`
          );
        } else if (fields === "description") {
          const conditions = text.map((t) => `p.description LIKE '%${t}%'`);
          advancedConditions.push(
            `(${conditions.join(` ${logicalOperator} `)})`
          );
        } else if (
          fields === "titleAndDescription" ||
          fields === "title_and_description"
        ) {
          const conditions = text.map(
            (t) => `(p.title LIKE '%${t}%' OR p.description LIKE '%${t}%')`
          );
          advancedConditions.push(
            `(${conditions.join(` ${logicalOperator} `)})`
          );
        }
      }

      if (advancedConditions.length > 0) {
        whereClauses.push(`(${advancedConditions.join(" AND ")})`);
      }
    }

    // if (time_to_be_reserved) {
    //   whereClauses.push(`p.time_to_sell <= ${time_to_be_reserved}`);
    // }
    // if (distance_in_km) {
    //   whereClauses.push(`p.distance <= ${distance_in_km}`);
    // }
    // if (allows_shipping !== undefined) {
    //   whereClauses.push(
    //     `p.allows_shipping = ${allows_shipping === "true" ? 1 : 0}`
    //   );
    // }

    let whereSQL = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    let orderClause = `ORDER BY p.reserved_date DESC`; // Valor por defecto

    if (order_by && getOnlySize === false) {
      switch (order_by) {
        case "price_asc":
          orderClause = `ORDER BY p.price ASC`;
          break;
        case "price_desc":
          orderClause = `ORDER BY p.price DESC`;
          break;
        case "reservation_date_desc":
          orderClause = `ORDER BY p.reserved_date DESC`;
          break;
        case "reservation_date_asc":
          orderClause = `ORDER BY p.reserved_date ASC`;
          break;
        case "time_to_sell_asc":
          orderClause = `ORDER BY p.time_to_sell ASC`;
          break;
        case "time_to_sell_desc":
          orderClause = `ORDER BY p.time_to_sell DESC`;
          break;
        case "distance_asc":
          orderClause = `ORDER BY p.distance ASC`;
          break;
        case "distance_desc":
          orderClause = `ORDER BY p.distance DESC`;
          break;
      }
    }
    // SELECT p.id,  p.title, p.description, p.price, p.images, p.time_to_sell, p.article_url, p.reserved_date

    const dataQuery = getOnlySize
      ? `SELECT COUNT(*) AS total FROM products p ${whereSQL};`
      : `
        SELECT p.id, p.title, p.description, p.price, p.images, p.time_to_sell, p.article_url, p.reserved_date
        FROM products p
        ${whereSQL}
        ${orderClause}
        LIMIT ${size} OFFSET ${offset};
      `;

    db.query(dataQuery, (err, results) => {
      if (err) {
        console.error("Error en la consulta:", err);
        reject(err);
      } else {
        if (getOnlySize) {
          resolve({ total: results[0].total });
        } else {
          const products = results.map((product) => ({
            ...product,
            images: JSON.parse(product.images),
          }));
          resolve({ products });
        }
      }
    });
  });
};

getProductDetails = (id) => {
  return new Promise((resolve, reject) => {
    const dataQuery = `
      SELECT p.*, c.id AS category_id, c.name AS category_name, sc.id AS subcategory_id, sc.name AS subcategory_name, 
             pt.id AS product_type_id, pt.name AS product_type_name, m.id AS model_id, m.name AS model_name, 
             b.id AS brand_id, b.name AS brand_name, co.id AS color_id, co.name AS color_name, 
             ptags.id AS ptag_id, ptags.tag_id AS tag_id, t.name AS tag_name, ps.id AS ps_id, ps.spec_id AS spec_id, 
             s.name AS spec_name, pd.id AS pd_id, pd.defect_id AS defect_id, d.name AS defect_name, 
             pe.id AS pe_id, pe.extra_id AS extra_id, e.name AS extra_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id 
      LEFT JOIN product_types pt ON p.product_type_id = pt.id 
      LEFT JOIN models m ON p.model_id = m.id 
      LEFT JOIN brands b ON p.brand_id = b.id 
      LEFT JOIN colors co ON p.color_id = co.id 
      LEFT JOIN products_tags ptags ON p.id = ptags.product_id 
      LEFT JOIN tags t ON ptags.tag_id = t.id 
      LEFT JOIN products_specs ps ON p.id = ps.product_id 
      LEFT JOIN specs s ON ps.spec_id = s.id 
      LEFT JOIN products_defects pd ON p.id = pd.product_id 
      LEFT JOIN defects d ON pd.defect_id = d.id 
      LEFT JOIN products_extras pe ON p.id = pe.product_id 
      LEFT JOIN extras e ON pe.extra_id = e.id 
      WHERE p.id = ?
      LIMIT 1;
    `;

    db.query(dataQuery, [id], (err, results) => {
      if (err) {
        console.error("Error en la consulta:", err);
        reject(err);
      } else {
        const product = results.reduce((acc, result) => {
          const {
            ptag_id,
            ps_id,
            pd_id,
            tag_id,
            pe_id,
            tag_name,
            spec_id,
            spec_name,
            defect_id,
            defect_name,
            extra_id,
            extra_name,
            category_id,
            category_name,
            sub_category_id,
            subcategory_name,
            product_type_id,
            product_type_name,
            model_id,
            model_name,
            brand_id,
            brand_name,
            color_id,
            color_name,
            images,
            ...rest
          } = result;

          if (!acc) {
            acc = {
              ...rest,
              images: JSON.parse(images),
              category:
                category_id && category_name
                  ? { id: category_id, name: category_name }
                  : {},
              sub_category:
                sub_category_id && subcategory_name
                  ? { id: sub_category_id, name: subcategory_name }
                  : {},
              product_type:
                product_type_id && product_type_name
                  ? { id: product_type_id, name: product_type_name }
                  : {},
              brand:
                brand_id && brand_name
                  ? { id: brand_id, name: brand_name }
                  : {},
              model:
                model_id && model_name
                  ? { id: model_id, name: model_name }
                  : {},
              color:
                color_id && color_name
                  ? { id: color_id, name: color_name }
                  : {},
              tags: tag_id && tag_name ? [{ id: tag_id, name: tag_name }] : [],
              specs:
                spec_id && spec_name ? [{ id: spec_id, name: spec_name }] : [],
              defects:
                defect_id && defect_name
                  ? [{ id: defect_id, name: defect_name }]
                  : [],
              extras:
                extra_id && extra_name
                  ? [{ id: extra_id, name: extra_name }]
                  : [],
            };
          } else {
            if (
              defect_id &&
              defect_name &&
              !acc.defects.some((defect) => defect.id === defect_id)
            ) {
              acc.defects.push({ id: defect_id, name: defect_name });
            }
            if (
              spec_id &&
              spec_name &&
              !acc.specs.some((spec) => spec.id === spec_id)
            ) {
              acc.specs.push({ id: spec_id, name: spec_name });
            }
            if (
              tag_id &&
              tag_name &&
              !acc.tags.some((tag) => tag.id === tag_id)
            ) {
              acc.tags.push({ id: tag_id, name: tag_name });
            }
            if (
              extra_id &&
              extra_name &&
              !acc.extras.some((extra) => extra.id === extra_id)
            ) {
              acc.extras.push({ id: extra_id, name: extra_name });
            }
          }
          return acc;
        }, null);

        resolve({ product });
      }
    });
  });
};

module.exports = {
  getOsrsPrices,
  getCustom,
  getCustom2,
  getFilteredProducts,
  getPrices,
  getProductById,
  editProduct,
  getCategories,
  getSubCategories,
  getModels,
  getProductTypes,
  getBrands,
  getColors,
  getTags,
  getSpecs,
  getDefects,
  getExtras,
  getEnumValuesOfColumn,
  getProducts,
  getProductDetails,
};
