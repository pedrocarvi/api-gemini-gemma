const express = require('express');
const { promptText } = require('../controllers/geminiController');
const router  = express.Router();

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

// realtime-conversation

// realtime-webcam

// live-screen

module.exports = router;
