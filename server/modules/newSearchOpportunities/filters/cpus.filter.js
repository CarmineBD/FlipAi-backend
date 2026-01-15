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
    "placa",
    "placa base",
    "motherboard",
    "ram",
    "memoria",
    "disipador",
    "cooler",
    "ventilador",
    "fuente",
    "psu",
    "caja",
    "torre",
    "ordenador",
    "pc",
  ];
  if (excludedStarts.some((word) => title.startsWith(word))) {
    return false;
  }

  const includeHints = [
    "ryzen",
    "amd",
    "intel",
    "procesador",
    "cpu",
    "microprocesador",
    "r7",
    "r9",
    "9700x",
    "7700x",
    "9900x",
    "7900x",
    "3900x",
  ];

  return includeHints.some((word) => text.includes(word));
}

module.exports = {
  applyBasicFilters,
};
