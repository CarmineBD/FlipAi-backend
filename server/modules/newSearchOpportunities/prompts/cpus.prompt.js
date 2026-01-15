const PROMPT_OBJECT = {
  model: "gpt-4.1-nano",
  instructions: `
    Devuelve SOLO JSON valido segun el schema.

    Reglas:
    - is_target_listing: true solo si el anuncio es de un procesador AMD Ryzen (CPU). Ignorar placas base, packs con placa/ram, PCs completos, disipadores o accesorios.
    - model: modelo exacto en formato slug. Valores permitidos: ryzen_7_9700x, ryzen_7_7700x, ryzen_9_9900x, ryzen_9_7900x, ryzen_9_3900x. Si no se puede inferir, "unknown".
    - has_defects: true si menciona defectos, fallos, no funciona, para piezas o similar.
    - confidence: valor 0..1 segun claridad del anuncio.
  `.trim(),
  max_output_tokens: 120,
  text: {
    format: {
      type: "json_schema",
      strict: true,
      name: "cpu_listing",
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          is_target_listing: { type: "boolean" },
          model: { type: "string" },
          has_defects: { type: "boolean" },
          confidence: { type: "number", minimum: 0, maximum: 1 },
        },
        required: ["is_target_listing", "model", "has_defects", "confidence"],
      },
    },
  },
};

module.exports = { PROMPT_OBJECT };
