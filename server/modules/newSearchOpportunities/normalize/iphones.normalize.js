const ALLOWED_MODELS = new Set([
  // Clásicos
  "2g",
  "3g",
  "3gs",
  "4",
  "4s",
  "5",
  "5c",
  "5s",
  "6",
  "6_plus",
  "6s",
  "6s_plus",
  "se_1",
  "7",
  "7_plus",
  "8",
  "8_plus",
  "x",
  "xr",
  "xs",
  "xs_max",

  // 11
  "11",
  "11_pro",
  "11_pro_max",
  "se_2",

  // 12
  "12_mini",
  "12",
  "12_pro",
  "12_pro_max",

  // 13
  "13_mini",
  "13",
  "13_pro",
  "13_pro_max",
  "se_3",

  // 14
  "14",
  "14_plus",
  "14_pro",
  "14_pro_max",

  // 15
  "15",
  "15_plus",
  "15_pro",
  "15_pro_max",

  // 16
  "16e",
  "16",
  "16_plus",
  "16_pro",
  "16_pro_max",

  // 17
  "17",
  "17_pro",
  "17_pro_max",
  "air",
]);

function normalizeModel(modelRaw) {
  const s = String(modelRaw || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/-+/g, "_");

  return ALLOWED_MODELS.has(s) ? s : "unknown";
}

function normalizeIphone(ai, item) {
  const model = normalizeModel(ai.model);

  const custom = {
    is_iphone: !!ai.is_iphone,
    model,
    has_defects: !!ai.has_defects,
    sealed: !!ai.sealed,
    capacity_gb: ai.capacity_gb != null ? Number(ai.capacity_gb) : undefined,
    confidence: ai.confidence != null ? Number(ai.confidence) : undefined,
  };

  // Definición de key para esta categoría para aplicar deals_rules
  const key = `iphone_${model}`;

  return { ...item, custom, key };
}

module.exports = { normalizeIphone };
