const hddRulesByKey = {
  global: [
    {
      id: "hdd_under_10_per_tb",
      label: "Sin defectos y <10€/TB",
      when: (p) =>
        !p.custom.defects &&
        (p.custom.capacity_tb ?? 0) > 0 &&
        p.price / (p.custom.capacity_tb ?? 1) < 10,
    },
  ],
};

module.exports = { hddRulesByKey };
