const { Router } = require("express");
const Inventario = require("../modelos/Inventario");

const router = Router();

router.get("/listar", async function (req, res) {
  try {
    const inventarios = await Inventario.find().populate([
      { path: "usuario", select: "nombre email" },
      { path: "marca", select: "nombre estado" },
      { path: "tipoEquipo", select: "nombre estado" },
      { path: "estadoEquipo", select: "nombre estado" },
    ]); // []
    res.send(inventarios);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error en servidor");
  }
});

router.post("/guardar", async function (req, res) {
  try {
    console.log(req.body);

    // Validar existencia del serial
    let validarExistenciaInventario = await Inventario.findOne({
      serial: req.body.serial,
    });
    if (validarExistenciaInventario) {
      return res.status(400).send("El serial ingresado ya existe");
    }

    // Validamos serial
    const validarSerial = req.body.serial;
    const patternSerial = new RegExp("^[0-9]+$", "i");

    if (!patternSerial.test(validarSerial)) {
      return res.send("No es un serial válido, solo se permiten números");
    }

    // validamos descripcion

    const validarDescripcion = req.body.descripcion;
    const patternDescripcion = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9\s]+$/gi);
    if (validarDescripcion.length <= 10) {
      return res.send(
        "La descripción tiene que tener un mínimo de 10 caracteres"
      );
    }

    if (!patternDescripcion.test(validarDescripcion)) {
      return res.send("No es una descripción válida");
    }

    // validamos foto

    const validarFoto = req.body.foto;
    let patternFoto = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i;

    if (!patternFoto.test(validarFoto)) {
      return res.send("No es una url válida");
    }

    // validamos precio
    const validarPrecio = req.body.precio;
    let patterPrecio = new RegExp("^[0-9]+$", "i");

    if (!patterPrecio.test(validarPrecio)) {
      return res.send("No es un precio válido, solo se permiten números");
    }

    // validamos color
    const validarColor = req.body.color;
    let patterColor = [
      "Rojo",
      "Naranja",
      "Cafe",
      "Amarillo",
      "Verde",
      "Azul",
      "Violeta",
      "Rosa",
      "Blanco",
      "Negro",
      "Gris",
    ];

    if (!patterColor.includes(validarColor)) {
      return res.send(
        "No es un color válido, solo se permiten los siguientes colores: Rojo, Naranja, Cafe, Amarillo, Verde, Azul, Violeta, Rosa, Blanco, Negro, Gris"
      );
    }

    inventario = new Inventario();
    inventario.serial = req.body.serial;
    inventario.modelo = req.body.modelo;
    inventario.descripcion = req.body.descripcion;
    inventario.foto = req.body.foto;
    inventario.fechaCompra = req.body.fechaCompra;
    inventario.precio = req.body.precio;
    inventario.color = req.body.color;
    inventario.usuario = req.body.usuario._id;
    inventario.marca = req.body.marca._id;
    inventario.tipoEquipo = req.body.tipoEquipo._id;
    inventario.estadoEquipo = req.body.estadoEquipo._id;
    inventario.fechaCreacion = new Date();
    inventario.fechaActualizacion = new Date();
    // guardamos
    inventario = await inventario.save();
    res.send(inventario);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error en servidor");
  }
});

router.put("/editar/:inventarioId", async function (req, res) {
  try {
    console.log(req.body, req.params.inventarioId);

    let inventario = await Inventario.findById(req.params.inventarioId);
    if (!inventario) {
      return res.status(400).send("Inventario no existe");
    }

    // Validamos serial
    const validarSerial = req.body.serial;
    const patternSerial = new RegExp("^[0-9]+$", "i");

    if (!patternSerial.test(validarSerial)) {
      return res.send("No es un serial válido, solo se permiten números");
    }

    // validamos descripcion

    const validarDescripcion = req.body.descripcion;
    const patternDescripcion = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9\s]+$/gi);
    if (validarDescripcion.length <= 10) {
      return res.send(
        "La descripción tiene que tener un mínimo de 10 caracteres"
      );
    }

    if (!patternDescripcion.test(validarDescripcion)) {
      return res.send("No es una descripción válida");
    }

    // validamos foto

    const validarFoto = req.body.foto;
    let patternFoto = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i;

    if (!patternFoto.test(validarFoto)) {
      return res.send("No es una url válida");
    }

    // validamos precio
    const validarPrecio = req.body.precio;
    let patterPrecio = new RegExp("^[0-9]+$", "i");

    if (!patterPrecio.test(validarPrecio)) {
      return res.send("No es un precio válido, solo se permiten números");
    }

    // validamos color
    const validarColor = req.body.color;
    let patterColor = [
      "Rojo",
      "Naranja",
      "Cafe",
      "Amarillo",
      "Verde",
      "Azul",
      "Violeta",
      "Rosa",
      "Blanco",
      "Negro",
      "Gris",
    ];

    if (!patterColor.includes(validarColor)) {
      return res.send(
        "No es un color válido, solo se permiten los siguientes colores: Rojo, Naranja, Cafe, Amarillo, Verde, Azul, Violeta, Rosa, Blanco, Negro, Gris"
      );
    }
    inventario.serial = req.body.serial;
    inventario.modelo = req.body.modelo;
    inventario.descripcion = req.body.descripcion;
    inventario.foto = req.body.foto;
    inventario.fechaCompra = req.body.fechaCompra;
    inventario.precio = req.body.precio;
    inventario.color = req.body.color;
    inventario.usuario = req.body.usuario._id;
    inventario.marca = req.body.marca._id;
    inventario.tipoEquipo = req.body.tipoEquipo._id;
    inventario.estadoEquipo = req.body.estadoEquipo._id;
    inventario.fechaActualizacion = new Date();
    // guardamos
    inventario = await inventario.save();
    res.send(inventario);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error en servidor");
  }
});

router.get("/:inventarioId", async function (req, res) {
  try {
    const inventario = await Inventario.findById(req.params.inventarioId);
    if (!inventario) {
      return res.status(404).send("Inventario no existe");
    }
    res.send(inventario);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error al consultar inventario por Id");
  }
});

module.exports = router;
