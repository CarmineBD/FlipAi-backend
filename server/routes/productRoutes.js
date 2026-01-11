const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// OBTENER DATOS PARA GRAFICOS
router.get("/data/charts/volume", productController.getFilteredProducts);
router.get("/data/charts/prices", productController.getFilteredProducts);
router.get("/data/charts/time_to_sell", productController.getFilteredProducts);
router.get("/data/charts/creation", productController.getFilteredProducts); //Heatmap
router.get("/data/charts/sales", productController.getFilteredProducts); //Heatmap

// Ruta para obtener los datos de los productos con filtros
router.get("/data/custom", productController.getCustomProducts);

// Ruta para obtener los datos de los productos con filtros
router.get("/data/custom2", productController.getCustomProducts2);

// OBTENER DATOS
// Ruta para obtener los datos de los productos con filtros
router.get("/data", productController.getFilteredProducts);

// Ruta para obtener los datos de los promedios de precios
router.get("/data/prices", productController.getPrices);

// Ruta para obtener los datos de los productos con filtros
router.get("/data/categories", productController.getCategories);

// Ruta para obtener los datos de los productos con filtros
router.get("/data/sub_categories", productController.getSubCategories);

// Ruta para obtener los datos de los productos con filtros
router.get("/data/brands", productController.getBrands);

// Ruta para obtener los datos de los productos con filtros
router.get("/data/product_types", productController.getProductTypes);

// Ruta para obtener los datos de los productos con filtros
router.get("/data/models", productController.getModels);

// Ruta para obtener los datos de los productos con filtros
router.get("/data/tags", productController.getTags);

// Ruta para obtener los datos de los productos con filtros
router.get("/data/specs", productController.getSpecs);

// Ruta para obtener los datos de los productos con filtros
router.get("/data/defects", productController.getDefects);

// Ruta para obtener los datos de los productos con filtros
router.get("/data/extras", productController.getExtras);

// Ruta para obtener los datos de los productos con filtros
router.get("/data/colors", productController.getColors);

// Ruta para obtener los datos de los promedios de precios
router.get("/data/enums", productController.getEnumValuesOfColumn);

// EDITAR DATOS
// Nueva ruta para editar manual_confirmed por ID usando PATCH
router.patch("/edit", productController.editProduct);

// Ruta para obtener la categoría de la búsqueda con la URL
router.get("/category", productController.getCategoryName);

// Ruta para obtener los datos de los precios de osrs
router.get("/data/osrs", productController.getOsrsPrices);

router.post("/getProducts", productController.getProducts);

router.post("/getProductsSize", productController.getProductsSize);

router.get("/getProductDetails", productController.getProductDetails);

module.exports = router;
