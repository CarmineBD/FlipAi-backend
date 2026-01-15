const ALLOWED_MODELS = new Set([
  "ryzen_7_9700x",
  "ryzen_7_7700x",
  "ryzen_9_9900x",
  "ryzen_9_7900x",
  "ryzen_9_3900x",
]);

function normalizeModel(modelRaw) {
  const raw = String(modelRaw || "").toLowerCase().trim();
  if (!raw) {
    return "unknown";
  }

  const slug = raw
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");

  if (/9700x/.test(slug)) {
    return "ryzen_7_9700x";
  }
  if (/7700x/.test(slug)) {
    return "ryzen_7_7700x";
  }
  if (/9900x/.test(slug)) {
    return "ryzen_9_9900x";
  }
  if (/7900x/.test(slug)) {
    return "ryzen_9_7900x";
  }
  if (/3900x/.test(slug)) {
    return "ryzen_9_3900x";
  }

  return ALLOWED_MODELS.has(slug) ? slug : "unknown";
}

function normalizeCpus(ai) {
  const model = normalizeModel(ai.model);
  const isTargetListing =
    ai.is_target_listing != null ? !!ai.is_target_listing : !!ai.is_cpu_listing;

  const custom = {
    is_target_listing: isTargetListing,
    model,
    has_defects: !!ai.has_defects,
    confidence: ai.confidence != null ? Number(ai.confidence) : undefined,
  };

  const key = model;

  return { custom, key };
}

module.exports = { normalizeCpus };
