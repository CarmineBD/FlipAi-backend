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

module.exports = {
  checkIfDataModelChanged,
};
