function applyBasicFilters({ item }) {
  if (!item) {
    return false;
  }

  const excludedCategories = new Set([200, 100, 13200]);
  const categoryValue = item.category ?? item.category_id;
  const categoryNumber =
    typeof categoryValue === "number" ? categoryValue : Number(categoryValue);
  if (excludedCategories.has(categoryNumber)) {
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
    "mando",
    "control",
    "filtro",
    "filtros",
    "tubo",
    "tubos",
    "manguera",
    "kit",
    "repuesto",
    "recambio",
    "cable",
    "soporte",
    "pieza",
    "instalacion",
    "instalación",
    "instalador",
    "tecnico",
    "técnico",
    "mantenimiento",
    "reparacion",
    "reparación",
    "limpieza",
    "servicio",
    "accesorio",
    "montaje",
    "montajes",
    "montador",
    "desmontaje",
    "piso",
    "alquiler",
  ];
  if (excludedStarts.some((word) => title.startsWith(word))) {
    return false;
  }

  const includeHints = [
    "aire acondicionado",
    "acondicionado",
    "split",
    "pinguino",
    "portatil",
    "btu",
    "climatizador",
  ];

  return includeHints.some((word) => text.includes(word));
}

module.exports = {
  applyBasicFilters,
};
