const fs = require("fs");
const path = require("path");

const cache = new Map();

function defaultRules() {
  return { global: [] };
}

function resolveRules(mod) {
  if (!mod || typeof mod !== "object") {
    return null;
  }

  if (mod.rulesByKey && typeof mod.rulesByKey === "object") {
    return mod.rulesByKey;
  }

  if (mod.default && typeof mod.default === "object") {
    return mod.default;
  }

  const values = Object.values(mod).filter(
    (value) => value && typeof value === "object"
  );
  if (values.length === 1) {
    return values[0];
  }

  return null;
}

function getRulesByCategory(category) {
  const key = typeof category === "string" && category ? category : "sin_categoria";
  if (cache.has(key)) {
    return cache.get(key);
  }

  if (!/^[a-z0-9_-]+$/i.test(key)) {
    const fallback = defaultRules();
    cache.set(key, fallback);
    return fallback;
  }

  const filePath = path.join(__dirname, `${key}.rules.js`);
  let rules = defaultRules();
  if (fs.existsSync(filePath)) {
    const mod = require(filePath);
    const candidate = resolveRules(mod);
    if (candidate && typeof candidate === "object") {
      rules = candidate;
    }
  }

  cache.set(key, rules);
  return rules;
}

module.exports = { getRulesByCategory };
