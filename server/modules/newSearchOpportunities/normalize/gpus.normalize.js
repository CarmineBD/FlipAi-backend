function normalizeModel(modelRaw) {
  const raw = String(modelRaw || "").toLowerCase().trim();
  if (!raw) {
    return "unknown";
  }

  let slug = raw
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");

  if (/rtx_?4060/.test(slug)) {
    if (slug.includes("ti") && slug.includes("super")) {
      return "rtx_4060_ti_super";
    }
    if (slug.includes("ti")) {
      return "rtx_4060_ti";
    }
    return "rtx_4060";
  }

  return slug || "unknown";
}

function normalizeGpus(ai) {
  const model = normalizeModel(ai.model);

  const custom = {
    is_gpu_listing: !!ai.is_gpu_listing,
    model,
    has_defects: !!ai.has_defects,
    confidence: ai.confidence != null ? Number(ai.confidence) : undefined,
  };

  const key = model;

  return { custom, key };
}

module.exports = { normalizeGpus };
