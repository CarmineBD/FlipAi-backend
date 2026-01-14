function evaluate(item, rulesByKey, fallbackKey = "global") {
  console.log("Evaluando item con key:", item.key);
  console.log("Evaluando item con key:", item.ai_fields.parsed);
  const key = item.key ?? fallbackKey;
  const rules = rulesByKey[key] || rulesByKey[fallbackKey] || [];
  const matches = rules.filter((r) => r.when(item));

  console.log(
    `Reglas evaluadas para key="${key}": ${rules.length}, coincidencias: ${matches.length}`
  );

  return { key, isDeal: matches.length > 0, matches };
}

module.exports = { evaluate };
