const { Router } = require("express");
const router = Router();
const Usuario = require("../modelos/Usuario");

router.get("/listar", async function (req, res) {
  try {
    const usuarios = await Usuario.find();
    res.send(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error en servidor");
  }
});

router.post("/guardar", async function (req, res) {
  try {
    // validamos email

    const validarExistenciaUsuario = await Usuario.findOne({
      email: req.body.email,
    });

    if (validarExistenciaUsuario) {
      return res.send("El email del usuario ingresado ya existe");
    }

    const regExpEmail = new RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    );
    const validarEmail = req.body.email;

    if (!regExpEmail.test(validarEmail)) {
      return res.send("No es un email válido");
    }

    // validamos nombre

    const validarNombre = req.body.nombre;
    let patterNombre = new RegExp("^[a-zA-Z]+$", "i");

    if (!patterNombre.test(validarNombre)) {
      return res.send("No es un nombre válido, solo se permiten letras");
    }

    // validamos estado

    const validarEstado = req.body.estado;
    let patterEstado = ["Activo", "Inactivo"];

    if (!patterEstado.includes(validarEstado)) {
      return res.send(
        "No es un estado válido, solo se permiten los siguientes estados: Activo e Inactivo"
      );
    }

    let usuario = new Usuario();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    usuario.fechaCreacion = new Date();
    usuario.fechaActualizacion = new Date();

    usuario = await usuario.save();

    res.send(usuario);
  } catch (error) {
    console.log(error);
    res.send("Ocurrio un error");
  }
});

router.put("/editar/:usuarioId", async function (req, res) {
  try {

    let usuario = await Usuario.findById(req.params.usuarioId);

        if(!usuario){
            return res.send("El usuario ingresado no existe");
        }

        
    // validamos email

    const validarExistenciaUsuario = await Usuario.findOne({
      email: req.body.email,
    });

    if (validarExistenciaUsuario) {
      return res.send("El email del usuario ingresado ya existe");
    }

    const regExpEmail = new RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    );
    const validarEmail = req.body.email;

    if (!regExpEmail.test(validarEmail)) {
      return res.send("No es un email válido");
    }

    // validamos nombre

    const validarNombre = req.body.nombre;
    let patterNombre = new RegExp("^[a-zA-Z]+$", "i");

    if (!patterNombre.test(validarNombre)) {
      return res.send("No es un nombre válido, solo se permiten letras");
    }

    // validamos estado

    const validarEstado = req.body.estado;
    let patterEstado = ["Activo", "Inactivo"];

    if (!patterEstado.includes(validarEstado)) {
      return res.send(
        "No es un estado válido, solo se permiten los siguientes estados: Activo e Inactivo"
      );
    }

    const existeUsuario = await Usuario.findOne({
      email: req.body.email,
      _id: { $ne: usuario._id },
    });

    if (existeUsuario) {
      return res.send("El email del usuario ingresado ya existe");
    }

    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    usuario.fechaCreacion = req.body.fechaCreacion;
    usuario.fechaActualizacion = new Date();
    // guardamos
    usuario = await usuario.save();
    res.send(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error en servidor");
  }
});

router.get("/:usuarioId", async function (req, res) {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId);
    if (!usuario) {
      return res.status(404).send("usuario no existe");
    }
    res.send(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error al consultar usuario por Id");
  }
});

module.exports = router;
