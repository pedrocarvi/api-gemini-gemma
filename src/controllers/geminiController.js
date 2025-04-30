require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const speech = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech');

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// STT y TTS
const speechClient = new speech.SpeechClient();
const ttsClient = new textToSpeech.TextToSpeechClient();

// Variable para enviar un archivo de audio 
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Helper para texto -> Gemini -> texto
async function generateTextResponse(prompt) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  });
  return response.text;
}

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

exports.promptAudio = [
  upload.single('audioFile'),
  asyncHandler(async (req, res) => {
    // 1) Validación de archivo
    if (!req.file) {
      return res.status(400).json({ error: "Envía el audio como campo 'audioFile'" });
    }

    // 2) Speech-to-Text
    const audioBytes = req.file.buffer.toString('base64');
    const [asr] = await speechClient.recognize({
      audio: { content: audioBytes },
      config: {
        encoding: 'MP3',
        sampleRateHertz: 16000,
        languageCode: 'es-AR'
      }
    });
    const transcript = asr.results
      .map(r => r.alternatives[0].transcript)
      .join(' ')
      .trim();

    if (!transcript) {
      return res.status(400).json({ error: 'No se pudo transcribir el audio.' });
    }

    // 3) Texto → Gemini
    const geminiText = await generateTextResponse(transcript);

    // 4) Text-to-Speech
    const [ttsResponse] = await ttsClient.synthesizeSpeech({
      input: { text: geminiText },
      voice: { languageCode: 'es-AR', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' }
    });

    // 5) Convertir buffer a Base64 y devolver JSON
    const audioBase64 = ttsResponse.audioContent.toString('base64');
    res.json({
      text: geminiText,
      audio: audioBase64  
    });
  })
];