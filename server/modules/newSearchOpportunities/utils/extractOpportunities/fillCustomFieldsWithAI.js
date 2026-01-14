const { getPromptByCategory } = require("../../prompts");
const { openai } = require("../../../../integrations/openai/client");
const { getNormalizerByCategory } = require("../../normalize");

async function fillCustomFieldsWithAI({ item, category }) {
  console.log("fillCustomFieldsWithAI ejecutado");

  // Paso 1: Extraer prompt segun categoria
  const prompt = getPromptByCategory(category);

  if (!prompt || typeof prompt !== "object") {
    console.warn(`Prompt invalido para categoria: ${category}`);
    return item;
  }

  // Paso 2: Llamar a la IA con el prompt construido

  //   (Opcional) - Consoles de duración de la llamada a la IA y la respuesta
  const aiStartTime = Date.now();

  //   LLamada a la IA
  const response = await openai.responses.create({
    ...prompt,
    input: `Titulo: ${item.title}\nDescripcion: ${item.description}`,
  });

  //   Console.log de la duración de la llamada a la IA
  const aiDurationMs = Date.now() - aiStartTime;
  console.log(
    `AI respuesta en ${aiDurationMs}ms para "${item.title}" (${category})`
  );

  const responseText = response.output_text;

  // Paso 3: Normalizar campos según categoría
  let aiJson;
  try {
    aiJson = JSON.parse(responseText);
  } catch (e) {
    console.warn(`IA devolvió JSON inválido (${category}).`);
    return item; // sin custom ni key
  }

  // Normalizar + key (por categoría)
  const normalizer = getNormalizerByCategory(category);
  if (!normalizer) return item;

  const { custom, key } = normalizer(aiJson);

  console.log("objeto final devuelto por fillCustomFieldsWithAI:", {
    ...item,
    custom,
    key,
    ai_fields: {
      raw: aiJson,
      parsed: custom,
    },
  });

  // Paso 4: Devolver el item modificado
  return {
    ...item,
    custom,
    key,
    ai_fields: {
      raw: aiJson,
      parsed: custom,
    },
  };

  return item;
}
module.exports = {
  fillCustomFieldsWithAI,
};
