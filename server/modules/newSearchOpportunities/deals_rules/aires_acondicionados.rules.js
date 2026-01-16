const airesAcondicionadosRulesByKey = {
  portatil: [
    {
      id: "ac_portatil_14000btu_nodefects_lt180",
      label: "Aire acondicionado portatil 14000 BTU sin defectos < 180 EUR",
      when: (p) =>
        p.ai_fields.parsed.is_target_listing &&
        !p.ai_fields.parsed.has_defects &&
        p.ai_fields.parsed.type === "portatil" &&
        (p.ai_fields.parsed.btu ?? 0) === 14000 &&
        p.price < 180,
    },
  ],
  global: [
    {
      id: "ac_nodefects_lt60",
      label: "Aire acondicionado sin defectos < 60 EUR",
      when: (p) =>
        p.ai_fields.parsed.is_target_listing &&
        !p.ai_fields.parsed.has_defects &&
        p.price < 60,
    },
  ],
};

module.exports = { airesAcondicionadosRulesByKey };
