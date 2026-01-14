const ALLOWED_MODELS = new Set([
  // Clásicos
  "iphone_2g",
  "iphone_3g",
  "iphone_3gs",
  "iphone_4",
  "iphone_4s",
  "iphone_5",
  "iphone_5c",
  "iphone_5s",
  "iphone_6",
  "iphone_6_plus",
  "iphone_6s",
  "iphone_6s_plus",
  "iphone_se_1",
  "iphone_7",
  "iphone_7_plus",
  "iphone_8",
  "iphone_8_plus",
  "iphone_x",
  "iphone_xr",
  "iphone_xs",
  "iphone_xs_max",

  // 11
  "iphone_11",
  "iphone_11_pro",
  "iphone_11_pro_max",
  "iphone_se_2",

  // 12
  "iphone_12_mini",
  "iphone_12",
  "iphone_12_pro",
  "iphone_12_pro_max",

  // 13
  "iphone_13_mini",
  "iphone_13",
  "iphone_13_pro",
  "iphone_13_pro_max",
  "iphone_se_3",

  // 14
  "iphone_14",
  "iphone_14_plus",
  "iphone_14_pro",
  "iphone_14_pro_max",

  // 15
  "iphone_15",
  "iphone_15_plus",
  "iphone_15_pro",
  "iphone_15_pro_max",

  // 16
  "iphone_16e",
  "iphone_16",
  "iphone_16_plus",
  "iphone_16_pro",
  "iphone_16_pro_max",

  // 17
  "iphone_17",
  "iphone_17_pro",
  "iphone_17_pro_max",
  "iphone_air",
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
  console.log("ai.model", ai.model);
  const model = normalizeModel(ai.model);
  let batteryLife =
    ai.battery_life != null ? Number(ai.battery_life) : undefined;
  if (Number.isFinite(batteryLife) && batteryLife > 0 && batteryLife < 1) {
    batteryLife *= 100;
  }
  if (Number.isFinite(batteryLife)) {
    batteryLife = Math.round(batteryLife);
  }

  const custom = {
    is_iphone: !!ai.is_iphone,
    model,
    has_defects: !!ai.has_defects,
    sealed: !!ai.sealed,
    capacity_gb: ai.capacity_gb != null ? Number(ai.capacity_gb) : undefined,
    battery_life: batteryLife,
    confidence: ai.confidence != null ? Number(ai.confidence) : undefined,
  };

  // Definición de key para esta categoría para aplicar deals_rules
  const key = model;

  return { ...item, custom, key };
}

module.exports = { normalizeIphone };
