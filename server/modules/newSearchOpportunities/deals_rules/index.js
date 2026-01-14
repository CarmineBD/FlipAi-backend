const { iphoneRulesByKey } = require("./iphones.rules");
const { hddRulesByKey } = require("./hdd_disks.rules");

function getRulesByCategory(category) {
  if (category === "iphones") return iphoneRulesByKey;
  if (category === "hdd_disks") return hddRulesByKey;
  return { global: [] };
}

module.exports = { getRulesByCategory };
