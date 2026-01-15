const fs = require("fs");
const path = require("path");

const cache = new Map();

function getPromptByCategory(category) {
  const key = typeof category === "string" && category ? category : "sin_categoria";
  if (cache.has(key)) {
    return cache.get(key);
  }

  if (!/^[a-z0-9_-]+$/i.test(key)) {
    cache.set(key, null);
    return null;
  }

  const promptPath = path.join(__dirname, `${key}.prompt.js`);
  let prompt = null;
  if (fs.existsSync(promptPath)) {
    try {
      const promptModule = require(promptPath);
      if (promptModule && typeof promptModule === "object") {
        prompt =
          promptModule.PROMPT_OBJECT ??
          promptModule.default ??
          promptModule;
      }
      if (!prompt || typeof prompt !== "object") {
        console.error(
          `Prompt JS invalido para ${key}. Esperado un objeto exportado.`
        );
        prompt = null;
      }
    } catch (error) {
      console.error(`Error leyendo prompt JS para ${key}:`, error);
    }
  }

  cache.set(key, prompt);
  return prompt;
}

module.exports = {
  getPromptByCategory,
};
