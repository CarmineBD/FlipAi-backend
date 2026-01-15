const fs = require("fs");
const path = require("path");

const cache = new Map();

function resolveNormalizer(mod) {
  if (typeof mod === "function") {
    return mod;
  }

  if (!mod || typeof mod !== "object") {
    return null;
  }

  if (typeof mod.normalize === "function") {
    return mod.normalize;
  }

  if (typeof mod.default === "function") {
    return mod.default;
  }

  const values = Object.values(mod).filter(
    (value) => typeof value === "function"
  );
  if (values.length === 1) {
    return values[0];
  }

  return null;
}

function getNormalizerByCategory(category) {
  const key = typeof category === "string" && category ? category : "sin_categoria";
  if (cache.has(key)) {
    return cache.get(key);
  }

  if (!/^[a-z0-9_-]+$/i.test(key)) {
    cache.set(key, null);
    return null;
  }

  const filePath = path.join(__dirname, `${key}.normalize.js`);
  let normalizer = null;
  if (fs.existsSync(filePath)) {
    const mod = require(filePath);
    const candidate = resolveNormalizer(mod);
    if (typeof candidate === "function") {
      normalizer = candidate;
    }
  }

  cache.set(key, normalizer);
  return normalizer;
}

module.exports = { getNormalizerByCategory };
