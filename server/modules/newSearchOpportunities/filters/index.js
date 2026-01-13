const fs = require("fs");
const path = require("path");

const cache = new Map();

function defaultFilter() {
  return true;
}

function getCategoryFilter(category) {
  const key = typeof category === "string" && category ? category : "sin_categoria";
  if (cache.has(key)) {
    return cache.get(key);
  }

  if (!/^[a-z0-9_-]+$/i.test(key)) {
    cache.set(key, defaultFilter);
    return defaultFilter;
  }

  const filePath = path.join(__dirname, key, `${key}.filter.js`);
  let filterFn = defaultFilter;
  if (fs.existsSync(filePath)) {
    const mod = require(filePath);
    const candidate =
      (mod && (mod.applyBasicFilters || mod.filter || mod.default)) || mod;
    if (typeof candidate === "function") {
      filterFn = candidate;
    }
  }

  cache.set(key, filterFn);
  return filterFn;
}

module.exports = {
  getCategoryFilter,
};
