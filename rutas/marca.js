const { Router } = require("express");
const router = Router();
const Marca = require("../modelos/Marca");

// GET http://localhost:4000/marca/listar
router.get("/listar", async function (req, res) {
  try {
    const marcas = await Marca.find();
    res.send(marcas);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error en servidor");
  }
});

// POST http://localhost:4000/marca/guardar
router.post("/guardar", async function (req, res) {
  try {
    const validarExistenciaMarca = await Marca.findOne({
      nombre: req.body.nombre,
    });

    if (validarExistenciaMarca) {
      return res.send("La marca ingresada ya existe");
    }

    // validamos nombre

    const validarNombre = req.body.nombre;
    let patterNombre = /[a-zA-Z\t\h]+|(^$)/i;

    if (!patterNombre.test(validarNombre)) {
      return res.send("No es un nombre válido, solo se permiten letras");
    }

    // validamos estado

    const validarEstado = req.body.estado;

    if (validarEstado != "Activo" && validarEstado != "Inactivo") {
      return res.send(
        'El estado ingresado no es válido, solo se aceptan los estados: "Activo" y "Inactivo"'
      );
    }

    let marca = new Marca();
    marca.nombre = req.body.nombre;
    marca.estado = req.body.estado;
    marca.fechaCreacion = req.body.fechaCreacion;
    marca.fechaActualizacion = new Date();

    marca = await marca.save();

    res.send(marca);
  } catch (error) {
    console.log(error);
    res.send("Ocurrio un error");
  }
});

// PUT http://localhost:4000/marca/editar/id
router.put("/editar/:marcaId", async function (req, res) {
  try {
    console.log("Objeto recibido", req.body, req.params.marcaId);

    let marca = await Marca.findById(req.params.marcaId);

    if (!marca) {
      return res.send("La marca ingresado no existe");
    }

    // validamos nombre

    const validarNombre = req.body.nombre;
    let patterNombre = /[a-zA-Z\t\h]+|(^$)/i;

    if (!patterNombre.test(validarNombre)) {
      return res.send("No es un nombre válido, solo se permiten letras");
    }

    // validamos estado

    const validarEstado = req.body.estado;

    if (validarEstado != "Activo" && validarEstado != "Inactivo") {
      return res.send(
        'El estado ingresado no es válido, solo se aceptan los estados: "Activo" y "Inactivo"'
      );
    }

    const existeMarca = await Marca.findOne({
      nombre: req.body.nombre,
      _id: { $ne: marca._id },
    });

    if (existeMarca) {
      return res.send("El nombre de la marca ingresada ya existe");
    }

    marca.nombre = req.body.nombre;
    marca.estado = req.body.estado;
    marca.fechaCreacion = req.body.fechaCreacion;
    marca.fechaActualizacion = new Date();
    // guardamos
    marca = await marca.save();
    res.send(marca);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error en servidor");
  }
});

// GET http://localhost:4000/marca/id
router.get("/:marcaId", async function (req, res) {
  try {
    const marca = await Marca.findById(req.params.marcaId);
    if (!marca) {
      return res.status(404).send("Marca no existe");
    }
    res.send(marca);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error al consultar marca por Id");
  }
});

module.exports = router;
