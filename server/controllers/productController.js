const Product = require("../models/productModel");
const getCategoryNameByUrl = require("../utils/getCategoryNameByUrl");
const searchReserveds = require("../modules/reserveds/searchReserveds");
const http = require("http");
const db = require("../db"); // Asegúrate de tener la conexión a la base de datos definida en '../db'

// Controlador para obtener las sub categorías de los productos
exports.getOsrsPrices = async (req, res) => {
  try {
    // const customParameter = req.query.customParameter;

    // const filters = {
    //     selectedCategoryId,
    //     // Agrega otros filtros que desees implementar
    // };

    // const products = await Product.getSubCategories(filters);
    const products = await Product.getOsrsPrices();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los precios de Osrs: ", error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

// Controlador para obtener los datos de los productos con filtros
exports.getFilteredProducts = async (req, res) => {
  try {
    const selectedCategories = req.query.category; // Aquí selectedCategories será un string con los IDs de categoría separados por comas
    // const selectedState = req.query.state;
    // const selectedRealState = req.query.real_state;
    // const selectedMinPrice = req.query.min_price;
    // const selectedMaxPrice = req.query.max_price;
    // const selectedDistance = req.query.distance;
    // const selectedStart = req.query.start;
    // const selectedOrder = req.query.order_by;
    // const selectedKeywords = req.query.keywords;
    // const selectedTitleKeywords = req.query.title_keywords;
    // const selectedDescriptionKeywords = req.query.description_keywords;

    // const selectedProductTypeId = req.query.product_type_id;
    // const selectedManualConfirmed = req.query.manual_confirmed;
    // const selectedSubCategoryId = req.query.sub_category_id;
    // const selectedSold = req.query.sold;
    // const selectedModelId = req.query.model_id;
    // const selectedColorId = req.query.color_id;
    // const selectedBrandId = req.query.brand_id;

    const selectedTags = req.query.tags;
    const selectedSpecs = req.query.specs;
    const selectedDefects = req.query.defects;
    const selectedExtras = req.query.extras;

    const selectedRows = req.query.rows;
    // Agrega otros filtros que desees implementar

    const categoriesArray = Array.isArray(selectedCategories)
      ? selectedCategories
      : [];
    const tagsArray = Array.isArray(selectedTags) ? selectedTags : [];
    const specsArray = Array.isArray(selectedSpecs) ? selectedSpecs : [];
    const defectsArray = Array.isArray(selectedDefects) ? selectedDefects : [];
    const extrasArray = Array.isArray(selectedExtras) ? selectedExtras : [];

    const filters = {
      selectedId: req.query.id,
      selectedArticleId: req.query.article_id,
      selectedArticleStatus: req.query.article_status,
      selectedUserId: req.query.user_id,
      selectedUserId: req.query.user_id,
      selectedAllowsShipping: req.query.allows_shipping,
      selectedFreeShipping: req.query.free_shipping,
      selectedCity: req.query.city,
      selectedPostalCode: req.query.postal_code,

      selectedWBrand: req.query.w_brand,
      selectedWModel: req.query.w_model,
      selectedWSubCategory: req.query.w_sub_category,
      selectedWSubSubCategory: req.query.w_sub_sub_category,

      selectedMinTimeToSell: req.query.min_time_to_sell,
      selectedMaxTimeToSell: req.query.max_time_to_sell,
      selectedMinCreationDate: req.query.min_creation_date,
      selectedMaxCreationDate: req.query.max_creation_date,
      selectedMinReservedDate: req.query.min_reserved_date,
      selectedMaxReservedDate: req.query.max_reserved_date,
      selectedMinViews: req.query.min_views,
      selectedMaxViews: req.query.max_views,
      selectedMinFavorites: req.query.min_favorites,
      selectedMaxFavorites: req.query.max_favorites,
      selectedMinSaleDate: req.query.min_sale_date,
      selectedMaxSaleDate: req.query.max_sale_date,

      selectedCategories: categoriesArray,
      selectedState: req.query.state,
      selectedRealState: req.query.real_state,
      selectedMinPrice: req.query.min_price,
      selectedMaxPrice: req.query.max_price,
      selectedDistance: req.query.distance,
      selectedStart: req.query.start,
      selectedOrder: req.query.order_by,
      selectedKeywords: req.query.keywords,
      selectedTitleKeywords: req.query.title_keywords,
      selectedDescriptionKeywords: req.query.description_keywords,
      selectedProductTypeId: req.query.product_type_id,
      selectedManualConfirmed: req.query.manual_confirmed,
      selectedSubCategoryId: req.query.sub_category_id,
      selectedSold: req.query.sold,
      selectedModelId: req.query.model_id,
      selectedColorId: req.query.color_id,
      selectedBrandId: req.query.brand_id,
      selectedTags: tagsArray,
      selectedSpecs: specsArray,
      selectedDefects: defectsArray,
      selectedExtras: extrasArray,
      selectedRows: req.query.rows,
    };

    const products = await Product.getFilteredProducts(filters);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos con filtros: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener los datos de los productos con filtros
exports.getPrices = async (req, res) => {
  try {
    const selectedCategories = req.query.category; // Aquí selectedCategories será un string con los IDs de categoría separados por comas
    const selectedState = req.query.state;
    const selectedRealState = req.query.real_state;
    const selectedMinPrice = req.query.min_price;
    const selectedMaxPrice = req.query.max_price;
    const selectedDistance = req.query.distance;
    const selectedStart = req.query.start;
    const selectedOrder = req.query.order_by;
    const selectedKeywords = req.query.keywords;
    const selectedTitleKeywords = req.query.title_keywords;
    const selectedDescriptionKeywords = req.query.description_keywords;

    const selectedProductTypeId = req.query.product_type_id;
    const selectedManualConfirmed = req.query.manual_confirmed;
    const selectedSubCategoryId = req.query.sub_category_id;
    const selectedSold = req.query.sold;
    const selectedModelId = req.query.model_id;
    const selectedColorId = req.query.color_id;
    const selectedBrandId = req.query.brand_id;

    const selectedTags = req.query.tags;
    const selectedSpecs = req.query.specs;
    const selectedDefects = req.query.defects;
    const selectedExtras = req.query.extras;

    const selectedRows = req.query.rows;
    // Agrega otros filtros que desees implementar

    const categoriesArray = Array.isArray(selectedCategories)
      ? selectedCategories
      : [];
    const tagsArray = Array.isArray(selectedTags) ? selectedTags : [];
    const specsArray = Array.isArray(selectedSpecs) ? selectedSpecs : [];
    const defectsArray = Array.isArray(selectedDefects) ? selectedDefects : [];
    const extrasArray = Array.isArray(selectedExtras) ? selectedExtras : [];

    const filters = {
      selectedCategories: categoriesArray,
      selectedState: req.query.state,
      selectedRealState: req.query.real_state,
      selectedMinPrice: req.query.min_price,
      selectedMaxPrice: req.query.max_price,
      selectedDistance: req.query.distance,
      selectedStart: req.query.start,
      selectedOrder: req.query.order_by,
      selectedKeywords: req.query.keywords,
      selectedTitleKeywords: req.query.title_keywords,
      selectedDescriptionKeywords: req.query.description_keywords,
      selectedProductTypeId: req.query.product_type_id,
      selectedManualConfirmed: req.query.manual_confirmed,
      selectedSubCategoryId: req.query.sub_category_id,
      selectedSold: req.query.sold,
      selectedModelId: req.query.model_id,
      selectedColorId: req.query.color_id,
      selectedBrandId: req.query.brand_id,
      selectedTags: tagsArray,
      selectedSpecs: specsArray,
      selectedDefects: defectsArray,
      selectedExtras: extrasArray,
      selectedRows: req.query.rows,
    };

    const products = await Product.getPrices(filters);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos con filtros: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener la categoría de la búsqueda con la url
exports.getCategoryName = (req, res) => {
  const url = req.url; // Obtén la URL de la solicitud
  const categoryName = getCategoryNameByUrl(url);
  res.json({ categoryName });
};

// Controlador para iniciar la búsqueda de productos reservados
exports.startSearchReserveds = (req, res) => {
  SearchReserveds(urls)
    .then(() => {
      res.json({ message: "Búsqueda de productos reservados completada." });
    })
    .catch((error) => {
      console.error("Error al ejecutar la búsqueda:", error);
      res.status(500).json({
        error: "Error al ejecutar la búsqueda de productos reservados.",
      });
    });
};

// Controlador para obtener los datos del producto
exports.editProduct = async (req, res) => {
  try {
    console.log(req.body);
    const selectedProductId = req.body.id;
    const selectedManualConfirmed = req.body.manual_confirmed;
    const selectedProductTypeId =
      req.body.product_type_id == "" ? null : req.body.product_type_id;
    const selectedState = req.body.state == "" ? null : req.body.state;
    const selectedRealState = req.body.real_state;
    const selectedCategoryId = req.body.category_id;
    const selectedSubCategoryId =
      req.body.sub_category_id == "" ? null : req.body.sub_category_id;
    const selectedSubSubCategoryId = req.body.sub_sub_category_id;
    const selectedTags = req.body.tags == "" ? null : req.body.tags;
    const selectedSold = req.body.sold;
    const selectedSpecs = req.body.specs == "" ? null : req.body.specs;
    const selectedModelId = req.body.model_id == "" ? null : req.body.model_id;
    const selectedColorId = req.body.color_id == "" ? null : req.body.color_id;
    const selectedDefects = req.body.defects == "" ? null : req.body.defects;
    const selectedExtras = req.body.extras == "" ? null : req.body.extras;
    const selectedBrandId = req.body.brand_id == "" ? null : req.body.brand_id;

    // Agrega otros filtros que desees implementar

    const tagsArray = Array.isArray(selectedTags) ? selectedTags : [];
    const defectsArray = Array.isArray(selectedDefects) ? selectedDefects : [];
    const specsArray = Array.isArray(selectedSpecs) ? selectedSpecs : [];
    const extrasArray = Array.isArray(selectedExtras) ? selectedExtras : [];

    const params = {
      selectedProductId,
      selectedManualConfirmed,
      selectedProductTypeId,
      selectedState,
      selectedRealState,
      selectedCategoryId,
      selectedSubCategoryId,
      selectedSubSubCategoryId,
      selectedTags: tagsArray,
      selectedSold,
      selectedSpecs: specsArray,
      selectedModelId,
      selectedColorId,
      selectedDefects: defectsArray,
      selectedExtras: extrasArray,
      selectedBrandId,
      // Agrega otros filtros que desees implementar
    };

    const product = await Product.editProduct(params);
    res.json(product);
  } catch (error) {
    console.error("Error al obtener los productos con filtros: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener las categorías de los productos
exports.getCustomProducts = async (req, res) => {
  try {
    // const selectedCategoryId = req.query.category_id;

    // const filters = {
    //     selectedCategoryId,
    //     // Agrega otros filtros que desees implementar
    // };

    const products = await Product.getCustom();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener las sub_categories: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener las categorías de los productos
exports.getCustomProducts2 = async (req, res) => {
  try {
    // const selectedCategoryId = req.query.category_id;

    // const filters = {
    //     selectedCategoryId,
    //     // Agrega otros filtros que desees implementar
    // };

    const products = await Product.getCustom2();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener las sub_categories: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener las categorías de los productos
exports.getCategories = async (req, res) => {
  try {
    // const selectedCategoryId = req.query.category_id;

    // const filters = {
    //     selectedCategoryId,
    //     // Agrega otros filtros que desees implementar
    // };

    const products = await Product.getCategories();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener las sub_categories: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener las brands de la categoría
exports.getBrands = async (req, res) => {
  try {
    const selectedCategoryId = req.query.category_id;
    const filters = {
      selectedCategoryId,
      // Agrega otros filtros que desees implementar
    };

    const products = await Product.getBrands(filters);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener las brands: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener las sub categorías de los productos
exports.getSubCategories = async (req, res) => {
  try {
    const selectedCategoryId = req.query.category_id;

    const filters = {
      selectedCategoryId,
      // Agrega otros filtros que desees implementar
    };

    const products = await Product.getSubCategories(filters);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener las sub_categories: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener las models de los productos
exports.getModels = async (req, res) => {
  try {
    const selectedProductTypeId = req.query.product_type_id;

    const filters = {
      selectedProductTypeId,
      // Agrega otros filtros que desees implementar
    };

    const products = await Product.getModels(filters);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los models: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener los product_types de las sub categorías
exports.getProductTypes = async (req, res) => {
  try {
    const selectedSubCategoryId = req.query.sub_category_id;
    const selectedBrandId = req.query.brand_id;

    const filters = {
      selectedSubCategoryId,
      selectedBrandId,
      // Agrega otros filtros que desees implementar
    };

    const products = await Product.getProductTypes(filters);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los product_types: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener los tags según el sub_category
exports.getTags = async (req, res) => {
  try {
    const selectedSubCategoryId = req.query.sub_category_id;

    const filters = {
      selectedSubCategoryId,
      // Agrega otros filtros que desees implementar
    };

    const products = await Product.getTags(filters);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los tags: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener los specs según el sub_category
exports.getSpecs = async (req, res) => {
  try {
    const selectedSubCategoryId = req.query.sub_category_id;
    const selectedModelId = req.query.model_id;

    // const specsArray = Array.isArray(selectedSpecsIds) ? selectedSpecsIds : [];

    const filters = {
      selectedSubCategoryId,
      selectedModelId,
      // Agrega otros filtros que desees implementar
    };

    const products = await Product.getSpecs(filters);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los specs: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener los defects según el sub_category
exports.getDefects = async (req, res) => {
  try {
    const selectedSubCategoryId = req.query.sub_category_id;

    const filters = {
      selectedSubCategoryId,
      // Agrega otros filtros que desees implementar
    };

    const products = await Product.getDefects(filters);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los defects: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener los extras según el sub_category
exports.getExtras = async (req, res) => {
  try {
    const selectedSubCategoryId = req.query.sub_category_id;

    const filters = {
      selectedSubCategoryId,
      // Agrega otros filtros que desees implementar
    };

    const products = await Product.getExtras(filters);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los extras: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener los colors según el sub_category
exports.getColors = async (req, res) => {
  try {
    const selectedSubCategoryId = req.query.sub_category_id;

    const filters = {
      selectedSubCategoryId,
      // Agrega otros filtros que desees implementar
    };

    const products = await Product.getColors(filters);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los colors: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Controlador para obtener las brands de la categoría
exports.getEnumValuesOfColumn = async (req, res) => {
  try {
    const filters = {
      selectedColumn: req.query.column,
      // Agrega otros filtros que desees implementar
    };

    const products = await Product.getEnumValuesOfColumn(filters);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener las brands: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

exports.getProducts = async (req, res) => {
  const filters = req.body; // Suponiendo que los filtros vienen en el body
  try {
    const products = await Product.getProducts(filters);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

exports.getProductsSize = async (req, res) => {
  const filters = req.body; // Suponiendo que los filtros vienen en el body
  try {
    const products = await Product.getProducts(filters, true);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

exports.getProductDetails = async (req, res) => {
  const { id } = req.query;
  try {
    const products = await Product.getProductDetails(parseInt(id));
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos: ", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// const { id, manual_confirmed } = req.body;
// console.log('esta es la id del producto clicado: ' + id)
// console.log('esta : ' + (manual_confirmed))
