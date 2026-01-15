const gpusRulesByKey = {
  rtx_4060: [
    {
      id: "rtx_4060_nodefects_lt200",
      label: "RTX 4060 sin defectos < 200 EUR",
      when: (p) =>
        p.ai_fields.parsed.is_gpu_listing &&
        !p.ai_fields.parsed.has_defects &&
        p.price < 200,
    },
  ],
  rtx_4060_ti: [
    {
      id: "rtx_4060_ti_nodefects_lt200",
      label: "RTX 4060 sin defectos < 200 EUR",
      when: (p) =>
        p.ai_fields.parsed.is_gpu_listing &&
        !p.ai_fields.parsed.has_defects &&
        p.price < 200,
    },
  ],
  global: [],
};

module.exports = { gpusRulesByKey };
