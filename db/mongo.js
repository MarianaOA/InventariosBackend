const mongoose = require('mongoose');
require("dotenv").config();

const getConnection = async () => {
    try {
        console.log('Inicializando llamado a bd');
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
        console.log('Estoy conectado');
    } catch(error) {
        console.log('Fallo la conexión a la base de datos');
    }
}

module.exports = {
    getConnection,
}