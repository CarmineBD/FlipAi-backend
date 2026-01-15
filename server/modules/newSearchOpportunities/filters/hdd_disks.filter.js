function applyBasicFilters({ item }) {
  if (!item) {
    return false;
  }

  return true;
}

module.exports = {
  applyBasicFilters,
};
