const gpusRulesByKey = {
  rtx_5060: [
    {
      id: "rtx_5060_nodefects_lt220",
      label: "RTX 5060 sin defectos < 220 EUR",
      when: (p) =>
        p.ai_fields.parsed.is_target_listing &&
        !p.ai_fields.parsed.has_defects &&
        p.price < 220,
    },
  ],
  rtx_4060: [
    {
      id: "rtx_4060_nodefects_lt180",
      label: "RTX 4060 sin defectos < 180 EUR",
      when: (p) =>
        p.ai_fields.parsed.is_target_listing &&
        !p.ai_fields.parsed.has_defects &&
        p.price < 180,
    },
  ],
  rtx_4060_ti: [
    {
      id: "rtx_4060_ti_nodefects_lt200",
      label: "RTX 4060 sin defectos < 200 EUR",
      when: (p) =>
        p.ai_fields.parsed.is_target_listing &&
        !p.ai_fields.parsed.has_defects &&
        p.price < 200,
    },
  ],
  global: [],
};

module.exports = { gpusRulesByKey };
