const express = require("express");
const app = express();

// Configuraciones generales

app.use(express.json());

// Inicializando servidor
app.listen(4000, () => {
    console.log("Server started at port 4000");
  });