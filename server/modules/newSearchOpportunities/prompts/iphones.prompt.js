const PROMPT_OBJECT = {
  model: "gpt-4.1-nano",
  instructions: `
    Devuelve SOLO JSON válido según el schema.

    Reglas:
    - is_target_listing: true solo si el anuncio es de moviles iphone, ignorar fundas, cargadores, accesorios, etc.
    - model: modelo exacto del iphone (ej: iphone_12_pro_max, iphone_16_pro, iphone_xr). Solo modelo, no almacenamiento, color, etc, si se desconoce: "UNKNOWN".
    - has_defects: false si el producto funciona correcrtamente, no tiene detalles ni desprefectos.
    - sealed: true solo si menciona que está precintado y la caja está sin abrir.
    - capacity_gb: capacidad de almacenamiento TOTAL (no ram) en GB. Si no se puede inferir, null.
    - battery_life: valor entre 0 y 100 indicando el estado de la batería. Si no se puede inferir, null.
    - confidence: valor 0..1 según claridad del anuncio.
  `.trim(),
  max_output_tokens: 120,
  text: {
    format: {
      type: "json_schema",
      strict: true,
      name: "storage_listing",
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          is_target_listing: { type: "boolean" },
          model: { type: "string" },
          has_defects: { type: "boolean" },
          sealed: { type: "boolean" },
          capacity_gb: { anyOf: [{ type: "number" }, { type: "null" }] },
          battery_life: { anyOf: [{ type: "number" }, { type: "null" }] },
          confidence: { type: "number", minimum: 0, maximum: 1 },
        },
        required: [
          "is_target_listing",
          "model",
          "has_defects",
          "sealed",
          "capacity_gb",
          "battery_life",
          "confidence",
        ],
      },
    },
  },
};

module.exports = { PROMPT_OBJECT };
