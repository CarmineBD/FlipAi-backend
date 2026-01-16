const PROMPT_OBJECT = {
  model: "gpt-4.1-nano",
  instructions: `
    Devuelve SOLO JSON valido segun el schema.

    Reglas:
    - is_target_listing: true solo si el anuncio es de un aire acondicionado. Ignorar mandos, filtros, tubos, repuestos, servicios, coches o accesorios.
    - type: "portatil" si es portatil o pinguino. "split" si es de pared/split. Si no se puede inferir, "unknown".
    - has_defects: true si menciona defectos, fallos, no funciona o para piezas.
    - btu: numero de BTU si se menciona explicitamente. Si no se indica, null.
    - confidence: valor 0..1 segun claridad del anuncio.
  `.trim(),
  max_output_tokens: 120,
  text: {
    format: {
      type: "json_schema",
      strict: true,
      name: "aire_acondicionado_listing",
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          is_target_listing: { type: "boolean" },
          type: { type: "string", enum: ["portatil", "split", "unknown"] },
          has_defects: { type: "boolean" },
          btu: { anyOf: [{ type: "number" }, { type: "null" }] },
          confidence: { type: "number", minimum: 0, maximum: 1 },
        },
        required: [
          "is_target_listing",
          "type",
          "has_defects",
          "btu",
          "confidence",
        ],
      },
    },
  },
};

module.exports = { PROMPT_OBJECT };
