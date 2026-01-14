const iphoneRulesByKey = {
  iphone_11: [
    {
      id: "ip11_gt90_lt200",
      label: "Batería >= 70, sin defectos, < 150€ ",
      when: (p) =>
        !p.ai_fields.parsed.has_defects &&
        (p.ai_fields.parsed.battery_life ?? 0) >= 70 &&
        p.price < 150,
    },
  ],
  global: [],
};

module.exports = { iphoneRulesByKey };
