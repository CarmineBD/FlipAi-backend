const { getPromptByCategory } = require("../../prompts");
const { openai } = require("../../../../integrations/openai/client");

async function fillCustomFieldsWithAI({ item, category }) {
  console.log("fillCustomFieldsWithAI ejecutado");

  // Paso 1: Extraer prompt segun categoria
  const prompt = getPromptByCategory(category);

  if (!prompt || typeof prompt !== "object") {
    console.warn(`Prompt invalido para categoria: ${category}`);
    return item;
  }

  // Paso 2: Llamar a la IA con el prompt construido
  const aiStartTime = Date.now();
  const response = await openai.responses.create({
    ...prompt,
    input: `Titulo: ${item.title}\nDescripcion: ${item.description}`,
  });

  const responseText = response.output_text;
  const aiDurationMs = Date.now() - aiStartTime;

  console.log(
    `AI respuesta en ${aiDurationMs}ms para "${item.title}" (${category})`
  );

  console.log("responseText:", responseText);

  // Paso 3: Parsear respuesta y rellenar campos personalizados en el item

  // Paso 4: Devolver el item modificado

  return item;
}
module.exports = {
  fillCustomFieldsWithAI,
};
