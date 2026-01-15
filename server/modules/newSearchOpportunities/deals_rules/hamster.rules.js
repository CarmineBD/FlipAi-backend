const hamsterRulesByKey = {
  global: [
    {
      id: "hamster_target_listing",
      label: "Hamster en venta o regalo",
      when: (p) => p.ai_fields.parsed.is_target_listing,
    },
  ],
};

module.exports = { hamsterRulesByKey };
