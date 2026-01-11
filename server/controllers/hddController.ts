// server/controllers/hddController.ts
import { openai } from "../integrations/openai/client";

export async function analyzeHdd(req, res) {
  try {
    const { title, description } = req.body;

    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: `Título: ${title}\nDescripción: ${description}`,
    });

    res.json(response);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error llamando a OpenAI" });
  }
}
