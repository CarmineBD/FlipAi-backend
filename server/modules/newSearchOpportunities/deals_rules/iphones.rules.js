const iphoneRulesByKey = {
  iphone_11: [
    {
      id: "ip11_bl90_lt200",
      label: "Batería >= 70, sin defectos, < 150€ ",
      when: (p) =>
        !p.ai_fields.parsed.has_defects &&
        (p.ai_fields.parsed.battery_life ?? 0) >= 70 &&
        p.price < 150,
    },
  ],
  iphone_15: [
    {
      id: "ip15_bl85_lt280",
      label: "iphone 15 sin defectos, Batería >= 85 < 280€ ",
      when: (p) =>
        !p.ai_fields.parsed.has_defects &&
        (p.ai_fields.parsed.battery_life ?? 0) >= 85 &&
        p.price < 280,
    },
  ],
  iphone_15_pro: [
    {
      id: "ip15p_bl85_lt330",
      label: "iphone 15 pro sin defectos, Batería >= 85 < 330€ ",
      when: (p) =>
        !p.ai_fields.parsed.has_defects &&
        (p.ai_fields.parsed.battery_life ?? 0) >= 85 &&
        p.price < 330,
    },
  ],
  iphone_15_pro_max: [
    {
      id: "ip15pm_bl85_lt360",
      label: "iphone 15 pro max sin defectos, Batería >= 85 < 360€ ",
      when: (p) =>
        !p.ai_fields.parsed.has_defects &&
        (p.ai_fields.parsed.battery_life ?? 0) >= 85 &&
        p.price < 360,
    },
  ],
  iphone_16: [
    {
      id: "ip16_bl85_lt450",
      label: "iphone 16 sin defectos, Batería >= 85 < 450",
      when: (p) =>
        !p.ai_fields.parsed.has_defects &&
        (p.ai_fields.parsed.battery_life ?? 0) >= 85 &&
        p.price < 450,
    },
  ],
  iphone_16_pro: [
    {
      id: "ip16p_bl85_lt550",
      label: "iphone 16 pro sin defectos, Batería >= 85 < 550",
      when: (p) =>
        !p.ai_fields.parsed.has_defects &&
        (p.ai_fields.parsed.battery_life ?? 0) >= 85 &&
        p.price < 550,
    },
  ],
  iphone_16_pro_max: [
    {
      id: "ip16pm_bl85_lt620",
      label: "iphone 16 pro max sin defectos, Batería >= 85 < 620 ",
      when: (p) =>
        !p.ai_fields.parsed.has_defects &&
        (p.ai_fields.parsed.battery_life ?? 0) >= 85 &&
        p.price < 620,
    },
  ],
  global: [],
};

module.exports = { iphoneRulesByKey };
