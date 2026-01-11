require("dotenv").config();
const { openai } = require("../../integrations/openai/client");

async function analyzeHddListing({ title, description }) {
  const prompt = `
Eres un asistente que analiza anuncios de Wallapop de discos de almacenamiento.

A partir del título y la descripción, debes deducir:

- is_storage_listing: Si el anuncio es realmente de componentes de discos de almacenamiento para ordenador.
- is_hdd: Si es un disco duro mecánico (HDD) o no.
- interface: Si la interfaz principal es SATA o SAS.
- capacity_tb: Capacidad total de la suma de almacenamiento de todas las unidades en TB (por ejemplo: "2TB", "2000GB" → 2; "500GB" → 0.5).
- units: Número de unidades (por ejemplo: "lote de 3 discos de 2TB" → 3).
- confidence: Un nivel de confianza de 0 a 1.

Devuelve SOLO JSON válido, sin texto extra, con esta forma exacta:

{
  "is_storage_listing": boolean,
  "is_hdd": boolean,
  "interface": "SATA" | "SAS" | "UNKNOWN",
  "capacity_tb": number | null,
  "units": number | null,
  "confidence": number
}

Si no puedes deducir algo, pon null y baja la confidence.

Título: "${title}"
Descripción: "${description}"
`;

  const response = await openai.responses.create({
    model: "gpt-5-nano", // o "gpt-4.1-mini" si quieres más precisión
    input: prompt,
  });

  const text = response.output_text;
  console.log("title: ", title);
  console.log("JSON.parse(text): ", JSON.parse(text));

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Error parseando JSON de OpenAI:", text);
    throw e;
  }
}

module.exports = { analyzeHddListing };
