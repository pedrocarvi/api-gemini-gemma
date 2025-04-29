# Diferencia entre Gemini y Gemma

### Gemma
- **Open Source**
- **Orientado a desarrolladores** que desean integrar IA en sus propias aplicaciones.
- **Ligero y eficiente**: Requiere menos recursos, ideal para entornos con hardware limitado.
- **Alta flexibilidad**: Permite personalización completa gracias a su código abierto.

### Gemini
- **Modelo comercial**
- **Enfocado en usuarios** finales, como asistentes virtuales o buscadores.
- **Modelo más grande y potente**: Ofrece capacidades más avanzadas, pero consume más recursos.
- **Menor flexibilidad**: Al ser cerrado y comercial, tiene menos opciones de personalización.

---

## Uso de Gemma en la API

Es necesario tener acceso a Ollama para poder usar sus modelos.
El .env tiene una variable OLLAMA_BASE_URL para completar con la URL base donde está alojado su Ollama (localhost o en la nube).

---

## Uso de Gemini en la API

Es necesario agregar la API Key de Google Cloud que permite el uso de Gemini.
El .env tiene una variable GOOGLE_API_KEY para completar con la misma. 