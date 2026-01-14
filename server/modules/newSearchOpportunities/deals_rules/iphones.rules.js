const iphoneRulesByKey = {
  iphone_11: [
    {
      id: "ip11_gt90_lt200",
      label: "Batería > 90, sin defectos, <200€",
      when: (p) =>
        !p.custom.defects && (p.custom.battery_life ?? 0) > 90 && p.price < 200,
    },
  ],
  global: [],
};

module.exports = { iphoneRulesByKey };
