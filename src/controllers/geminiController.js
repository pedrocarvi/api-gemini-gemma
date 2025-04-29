require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

exports.promptText = async (req, res, next) => {
    const { question } = req.body

    if (!question) {
        return res.status(400).json({error: "Debe enviar una pregunta"})
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: question,
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error('Error en la generación de contenido:', error);
      res.status(500).json({ error: 'Error en la generación de contenido' });
    }
}