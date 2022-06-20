require("dotenv").config();
const { getConnection } = require('./db/mongo');
const PORT = process.env.PORT || 4000;
const express = require("express");
const app = express();

// Conexión a MongoDB

getConnection();

// Configuraciones generales

app.use(express.json());

// Inicializando servidor
app.listen(PORT, () => {
    console.log("Servidor inicializado en el puerto: ", PORT);
  });