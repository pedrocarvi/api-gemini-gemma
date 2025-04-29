const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi    = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
      openapi: '3.0.0', 
      info: {
        title: 'API Gemini Gemma',
        version: '1.0.0',
        description: 'Esta es una API que utiliza Google GenAI para generar contenido.',
      },
    },
    apis: ['./src/routes/*.js']  
};

const specs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, specs };