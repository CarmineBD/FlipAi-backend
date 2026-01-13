function applyBasicFilters({ item }) {
  if (!item) {
    return false;
  }

  const title = typeof item.title === "string" ? item.title.toLowerCase() : "";
  if (!title) {
    return false;
  }

  return title.includes("iphone") || title.includes("iphon");
}

module.exports = {
  applyBasicFilters,
};
