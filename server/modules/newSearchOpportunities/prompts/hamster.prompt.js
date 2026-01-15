const PROMPT_OBJECT = {
  model: "gpt-4.1-nano",
  instructions: `
    Devuelve SOLO JSON valido segun el schema.

    Reglas:
    - is_target_listing: true solo si el anuncio incluye un hamster como mascota en venta o regalo. false si es solo jaula, comida, accesorios, juguetes, ruedas, camas, arena, servicios o si busca comprar/adoptar sin ofrecer un hamster.
  `.trim(),
  max_output_tokens: 60,
  text: {
    format: {
      type: "json_schema",
      strict: true,
      name: "hamster_listing",
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          is_target_listing: { type: "boolean" },
        },
        required: ["is_target_listing"],
      },
    },
  },
};

module.exports = { PROMPT_OBJECT };
