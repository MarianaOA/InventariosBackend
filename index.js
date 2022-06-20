require("dotenv").config();
const { getConnection } = require('./db/mongo');
const PORT = process.env.PORT || 4000;
const express = require("express");
const app = express();
const cors = require("cors");
// Configuraciones generales

app.use(express.json());
app.use(cors());

// Conexión a MongoDB

getConnection();

// rutas de los controladores

const inventario = require("./rutas/inventario");
const usuario = require("./rutas/usuario");
const marca = require("./rutas/marca");
const tipoEquipo = require("./rutas/tipoEquipo");
const estadoEquipo = require("./rutas/estadoEquipo");

app.use("/usuario", usuario);
app.use("/marca", marca); 
app.use("/tipoEquipo", tipoEquipo); 
app.use("/inventario", inventario); 
app.use("/estadoEquipo", estadoEquipo); 

// Inicializando servidor
app.listen(PORT, () => {
    console.log("Servidor inicializado en el puerto: ", PORT);
  });