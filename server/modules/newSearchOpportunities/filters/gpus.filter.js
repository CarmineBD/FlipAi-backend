function applyBasicFilters({ item }) {
  if (!item) {
    return false;
  }

  const title =
    typeof item.title === "string" ? item.title.toLowerCase().trim() : "";
  const description =
    typeof item.description === "string"
      ? item.description.toLowerCase().trim()
      : "";
  const text = `${title} ${description}`.trim();
  if (!text) {
    return false;
  }

  const excludedStarts = [
    "cable",
    "soporte",
    "caja",
    "fuente",
    "psu",
    "riser",
    "backplate",
    "waterblock",
    "ventilador",
    "cooler",
  ];
  if (excludedStarts.some((word) => title.startsWith(word))) {
    return false;
  }

  const includeHints = [
    "tarjeta grafica",
    "grafica",
    "gpu",
    "rtx",
    "gtx",
    "radeon",
    "geforce",
    "nvidia",
    "amd",
  ];

  return includeHints.some((word) => text.includes(word));
}

module.exports = {
  applyBasicFilters,
};
