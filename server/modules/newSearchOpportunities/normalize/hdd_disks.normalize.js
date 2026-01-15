function normalizeHdd(ai) {
  const iface = ai.interface ? String(ai.interface).toLowerCase() : undefined;
  const isTargetListing =
    ai.is_target_listing != null
      ? !!ai.is_target_listing
      : !!ai.is_storage_listing;

  const custom = {
    is_target_listing: isTargetListing,
    is_hdd: !!ai.is_hdd,
    interface: iface,
    capacity_tb: ai.capacity_tb != null ? Number(ai.capacity_tb) : undefined,
    has_defects: !!ai.defects,
    units: ai.units != null ? Number(ai.units) : undefined,
    confidence: ai.confidence != null ? Number(ai.confidence) : undefined,
  };

  // Definición de key para esta categoría para aplicar deals_rules
  const key = "global";

  return { custom, key };
}

module.exports = { normalizeHdd };
