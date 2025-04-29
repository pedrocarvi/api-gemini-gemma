const express = require('express');
const { promptText } = require('../controllers/gemmaController');
const router  = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Gemma
 * 
 * /gemma/prompt-text:
 *   post:
 *     tags:
 *       - Gemma
 *     summary: Genera un texto utilizando la API de Ollama con el modelo de gemma3:4b
 *     description: Llama a la API de Ollama con el modelo gemma3:4b para generar una respuesta según la pregunta proporcionada en el body de la solicitud.
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

module.exports = router;
