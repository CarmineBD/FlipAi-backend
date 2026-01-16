const ALLOWED_TYPES = new Set(["portatil", "split", "unknown"]);

function normalizeType(typeRaw) {
  const raw = String(typeRaw || "").toLowerCase().trim();
  if (!raw) {
    return "unknown";
  }

  if (raw.includes("pinguino") || raw.includes("portatil")) {
    return "portatil";
  }

  if (raw.includes("split") || raw.includes("pared") || raw.includes("mural")) {
    return "split";
  }

  const slug = raw
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");

  return ALLOWED_TYPES.has(slug) ? slug : "unknown";
}

function normalizeBtu(btuRaw) {
  if (btuRaw == null) {
    return null;
  }

  if (typeof btuRaw === "string") {
    const digits = btuRaw.replace(/[^\d]/g, "");
    if (digits) {
      const parsed = Number(digits);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
    }
  }

  const value = Number(btuRaw);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function normalizeAiresAcondicionados(ai) {
  const type = normalizeType(ai.type);
  const isTargetListing =
    ai.is_target_listing != null ? !!ai.is_target_listing : !!ai.is_air_conditioner;

  const custom = {
    is_target_listing: isTargetListing,
    type,
    has_defects: !!ai.has_defects,
    btu: normalizeBtu(ai.btu),
    confidence: ai.confidence != null ? Number(ai.confidence) : undefined,
  };

  const key = type;

  return { custom, key };
}

module.exports = { normalizeAiresAcondicionados };
