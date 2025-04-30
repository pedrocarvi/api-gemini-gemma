const express = require('express');
const { promptText, promptAudio } = require('../controllers/geminiController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Gemini
 * 
 * /gemini/prompt-text:
 *   post:
 *     tags:
 *       - Gemini
 *     summary: Genera un texto utilizando la API de Google GenAI
 *     description: Llama a la API de Google GenAI para generar una respuesta según la pregunta proporcionada en el body de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: La pregunta a generar contenido
 *                 example: "Explica como funciona la IA en pocas palabras"
 *     responses:
 *       200:
 *         description: Respuesta exitosa con el texto generado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   description: El contenido generado.
 *       400:
 *         description: Error debido a falta de la pregunta en el body de la solicitud.
 *       500:
 *         description: Error en la generación de contenido.
 */
router.post('/prompt-text', promptText);


/**
 * @swagger
 * /gemini/prompt-audio:
 *   post:
 *     tags:
 *       - Gemini
 *     summary: Procesa un audio y devuelve texto + audio
 *     description: |
 *       Recibe un MP3, lo convierte a texto, genera la respuesta con Gemini
 *       y sintetiza la respuesta a MP3 en Base64.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               audioFile:
 *                 type: string
 *                 format: binary
 *                 description: Archivo MP3 con la pregunta hablada.
 *     responses:
 *       200:
 *         description: JSON con la respuesta en texto y el audio en Base64.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   description: Respuesta generada por Gemini.
 *                 audio:
 *                   type: string
 *                   description: Audio MP3 codificado en Base64 con la respuesta hablada.
 *       400:
 *         description: Error en transcripción o falta de archivo.
 *       500:
 *         description: Error interno al procesar el audio.
 */
router.post('/prompt-audio', promptAudio);

module.exports = router;
