const { Router } = require("express");
const router = Router();
const EstadoEquipo = require("../modelos/EstadoEquipo");

// GET http://localhost:4000/equipoEquipo/listar
router.get("/listar", async function (req, res) {
  try {
    const estadoEquipo = await EstadoEquipo.find();
    res.send(estadoEquipo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error en servidor");
  }
});

// POST http://localhost:4000/estadoEquipo/guardar
router.post("/guardar", async function (req, res) {
  try {
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

    let equipoEstado = new EstadoEquipo();
    equipoEstado.nombre = req.body.nombre;
    equipoEstado.estado = req.body.estado;
    equipoEstado.fechaCreacion = req.body.fechaCreacion;
    equipoEstado.fechaActualizacion = new Date();

    equipoEstado = await equipoEstado.save();

    res.send(equipoEstado);
  } catch (error) {
    console.log(error);
    res.send("Ocurrio un error");
  }
});

// PUT http://localhost:4000/estadoEquipo/editar/id
router.put("/editar/:estadoEquipoId", async function (req, res) {
  try {
    let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);

    if (!estadoEquipo) {
      return res.send("El tipo de equipo ingresado no existe");
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

    const existeEquipo = await EstadoEquipo.findOne({
      nombre: req.body.nombre,
      _id: { $ne: estadoEquipo._id },
    });

    if (existeEquipo) {
      return res.send("El nombre del tipo de equipo ingresado ya existe");
    }

    estadoEquipo.nombre = req.body.nombre;
    estadoEquipo.estado = req.body.estado;
    estadoEquipo.fechaCreacion = req.body.fechaCreacion;
    estadoEquipo.fechaActualizacion = new Date();
    // guardamos
    estadoEquipo = await estadoEquipo.save();
    res.send(estadoEquipo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error en servidor");
  }
});

// GET http://localhost:4000/estadoEquipo/id
router.get("/:estadoEquipoId", async function (req, res) {
  try {
    const estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
    if (!estadoEquipo) {
      return res.status(404).send("Estado no existe");
    }
    res.send(estadoEquipo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error al consultar estado equipo por Id");
  }
});

module.exports = router;
