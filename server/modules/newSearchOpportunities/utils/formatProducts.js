// Formatear productos
function formatProducts(array) {
  return array.map((product) => {
    return {
      article_id: product.id,
      category_id: product.category_id,
      // sub_category_id: getProductSubCategory(product),
      // sub_sub_category_id: getProductSubSubCategory(product),
      time_to_sell: product.modified_at - product.created_at,
      // product_type: getProductType(product),
      price: product.price.amount,
      title: product.title,
      description: product.description,
      // state: product.state,
      // real_state: getProductRealState(product),
      images: JSON.stringify(product.images.map((imagen) => imagen.urls.big)),
      creation_date: product.created_at,
      distance: product.distance,
      postal_code: product.location.postal_code,
      user_id: product.user_id,
      allows_shipping: product.shipping.user_allows_shipping,
      free_shipping: product.free_shipping,
      article_url: "https://es.wallapop.com/item/" + product.web_slug,
      city: product.location.city,
      reserved_date: product.modified_at,
    };
  });
}

module.exports = {
  formatProducts,
};
