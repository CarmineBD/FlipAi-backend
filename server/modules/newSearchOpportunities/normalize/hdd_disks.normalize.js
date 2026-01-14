function normalizeHdd(ai) {
  const iface = ai.interface ? String(ai.interface).toLowerCase() : undefined;

  const custom = {
    is_storage_listing: !!ai.is_storage_listing,
    is_hdd: !!ai.is_hdd,
    interface: iface,
    capacity_tb: ai.capacity_tb != null ? Number(ai.capacity_tb) : undefined,
    hasDefects: !!ai.defects,
    units: ai.units != null ? Number(ai.units) : undefined,
    confidence: ai.confidence != null ? Number(ai.confidence) : undefined,
  };

  // Definición de key para esta categoría para aplicar deals_rules
  const key = "global";

  return { custom, key };
}

module.exports = { normalizeHdd };
