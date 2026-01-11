// Eliminar duplicados en caso de que se haya colado alguno
function removeDuplicateProducts(items) {
  const uniqueItems = [];
  const itemIds = new Set();
  let duplicatesCount = 0;

  for (const item of items) {
    if (!itemIds.has(item.id)) {
      uniqueItems.push(item);
      itemIds.add(item.id);
    } else {
      duplicatesCount++;
    }
  }

  console.log(`Productos duplicados eliminados: ${duplicatesCount}`);
  return uniqueItems;
}

module.exports = {
  removeDuplicateProducts,
};
