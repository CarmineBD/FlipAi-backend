const PROMPT_OBJECT = {
  model: "gpt-4.1-nano",
  instructions: `
    Devuelve SOLO JSON valido segun el schema.

    Reglas:
    - is_target_listing: true solo si el anuncio es de una tarjeta grafica (GPU). Ignorar soportes, cables, fuentes, cajas, waterblocks, etc.
    - model: modelo exacto en formato slug (ej: rtx_4060, rtx_4060_ti, rtx_4070, rx_7600). Si no se puede inferir, "unknown".
    - has_defects: true si menciona defectos, fallos, artefactos, problemas de temperatura o que no funciona bien.
    - capacity: en GB, si se menciona. Si no se puede inferir, undefined.
    - confidence: valor 0..1 segun claridad del anuncio.
  `.trim(),
  max_output_tokens: 120,
  text: {
    format: {
      type: "json_schema",
      strict: true,
      name: "gpu_listing",
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          is_target_listing: { type: "boolean" },
          model: { type: "string" },
          has_defects: { type: "boolean" },
          capacity: { type: "number" },
          confidence: { type: "number", minimum: 0, maximum: 1 },
        },
        required: [
          "is_target_listing",
          "model",
          "has_defects",
          "capacity",
          "confidence",
        ],
      },
    },
  },
};

module.exports = { PROMPT_OBJECT };
