const cpusRulesByKey = {
  ryzen_7_9700x: [
    {
      id: "r7_9700x_nodefects_lt180",
      label: "Ryzen 7 9700X sin defectos < 180 EUR",
      when: (p) =>
        p.ai_fields.parsed.is_target_listing &&
        !p.ai_fields.parsed.has_defects &&
        p.price < 180,
    },
  ],
  ryzen_7_7700x: [
    {
      id: "r7_7700x_nodefects_lt125",
      label: "Ryzen 7 7700X sin defectos < 125 EUR",
      when: (p) =>
        p.ai_fields.parsed.is_target_listing &&
        !p.ai_fields.parsed.has_defects &&
        p.price < 125,
    },
  ],
  ryzen_9_9900x: [
    {
      id: "r9_9900x_nodefects_lt230",
      label: "Ryzen 9 9900X sin defectos < 230 EUR",
      when: (p) =>
        p.ai_fields.parsed.is_target_listing &&
        !p.ai_fields.parsed.has_defects &&
        p.price < 230,
    },
  ],
  ryzen_9_7900x: [
    {
      id: "r9_7900x_nodefects_lt220",
      label: "Ryzen 9 7900X sin defectos < 220 EUR",
      when: (p) =>
        p.ai_fields.parsed.is_target_listing &&
        !p.ai_fields.parsed.has_defects &&
        p.price < 220,
    },
  ],
  ryzen_9_3900x: [
    {
      id: "r9_3900x_nodefects_lt110",
      label: "Ryzen 9 3900X sin defectos < 110 EUR",
      when: (p) =>
        p.ai_fields.parsed.is_target_listing &&
        !p.ai_fields.parsed.has_defects &&
        p.price < 110,
    },
  ],
  global: [],
};

module.exports = { cpusRulesByKey };
