require('dotenv').config();
const axios = require('axios');

exports.promptText = async (req, res, next) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Debe enviar una pregunta" });
  }

  try {
    const ollamaUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
    const modelName = process.env.OLLAMA_GEMMA_MODEL || "gemma3:4b";

    // console.log("Ollama URL:", ollamaUrl);
    // console.log("Modelo:", modelName);

    const { data } = await axios.post(
      `${ollamaUrl}/api/generate`,
      {
        model: modelName,
        prompt: question,
        stream: false
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    return res.json({ text: data.response });

  } catch (error) {
    console.error("Error al generar con Ollama:", error.message);
    return res.status(500).json({ error: "Error al generar con Ollama" });
  }
};
