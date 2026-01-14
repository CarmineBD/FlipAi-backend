const { normalizeIphone } = require("./iphones.normalize");
const { normalizeHdd } = require("./hdd_disks.normalize");

function getNormalizerByCategory(category) {
  if (category === "iphones") return normalizeIphone;
  if (category === "hdd_disks") return normalizeHdd;
  return null;
}

module.exports = { getNormalizerByCategory };
