function evaluate(item, rulesByKey, fallbackKey = "global") {
  const key = item.key ?? fallbackKey;
  const rules = rulesByKey[key] || rulesByKey[fallbackKey] || [];
  const matches = rules.filter((r) => r.when(item));

  return { key, isDeal: matches.length > 0, matches };
}

module.exports = { evaluate };
