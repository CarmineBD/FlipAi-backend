function applyBasicFilters({ item }) {
  if (!item) {
    return false;
  }

  const title =
    typeof item.title === "string" ? item.title.toLowerCase().trim() : "";
  if (!title) {
    return false;
  }

  const excludedStarts = [
    "funda",
    "fundas",
    "protector",
    "protectores",
    "cargador",
    "soporte",
    "carcasa",
    "cover",
    "auriculares",
    "caja",
    "bateria",
    "batteria",
    "diaplay",
    "cable",
  ];
  if (excludedStarts.some((word) => title.startsWith(word))) {
    return false;
  }

  return title.includes("iphone") || title.includes("iphon");
}

module.exports = {
  applyBasicFilters,
};
