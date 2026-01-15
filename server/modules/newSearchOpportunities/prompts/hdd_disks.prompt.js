const PROMPT_OBJECT = {
  model: "gpt-4.1-nano",
  instructions: `
    Devuelve SOLO JSON válido según el schema.

    Reglas:
    - is_target_listing: true solo si el anuncio es de discos duros internos de ordenador. Ignorar accesorios, cables, adaptadores, laptops, ordenadores etc.
    - is_hdd: true si es disco mecánico (HDD). False si es SSD/NVMe/otros.
    - has_defects: true si el anuncio menciona que el disco tiene defectos, warnings o no funciona correctamente.
    - interface: SATA o SAS solo si aparece explícitamente, si no UNKNOWN.
    - capacity_tb: capacidad TOTAL en TB (2000GB=2, 500GB=0.5). Si no se puede inferir, null.
    - units: número de unidades si se menciona (lote, pack, xN). Si no, null.
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
          is_hdd: { type: "boolean" },
          has_defects: { type: "boolean" },
          interface: { type: "string", enum: ["SATA", "SAS", "UNKNOWN"] },
          capacity_tb: { anyOf: [{ type: "number" }, { type: "null" }] },
          units: { anyOf: [{ type: "number" }, { type: "null" }] },
          confidence: { type: "number", minimum: 0, maximum: 1 },
        },
        required: [
          "is_target_listing",
          "is_hdd",
          "has_defects",
          "interface",
          "capacity_tb",
          "units",
          "confidence",
        ],
      },
    },
  },
};

module.exports = { PROMPT_OBJECT };
