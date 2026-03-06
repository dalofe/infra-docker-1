// Importamos las librerías
const express = require("express");
const cors = require("cors");

// Inicializamos la aplicación
const app = express();
const PORT = 3000;

// Middleware: Habilitamos CORS
// Como frontend dev sabes lo doloroso que es el error de CORS.
// Con esta línea, le decimos al servidor que acepte peticiones de otros puertos.
app.use(cors());

// Middleware: Para que el servidor entienda datos en formato JSON
app.use(express.json());

// Nuestro primer "endpoint" (Ruta de la API)
// Cuando alguien haga un GET a http://localhost:3000/api/status, devolvemos esto:
app.get("/api/status", (req, res) => {
  res.json({
    message: "Hello world! Successfull request from Node.js 🚀",
    timestamp: new Date().toISOString(),
  });
});

// Arrancamos el servidor y lo dejamos "escuchando" en el puerto 3000
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
