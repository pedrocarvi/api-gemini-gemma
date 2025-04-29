require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { swaggerUi, specs } = require('./swaggerOptions');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// Rutas
const geminiRouter = require('./routes/geminiRouter');
const gemmaRouter = require('./routes/gemmaRouter');

app.get('/', (req, res) => {
  res.send('API Gemini-Gemma');
});
app.use('/gemini', geminiRouter);
app.use('/gemma', gemmaRouter);
//

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
