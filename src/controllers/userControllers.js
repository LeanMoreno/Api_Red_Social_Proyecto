const { User } = require("../models");

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

const obtenerUsuario = async (req, res) => {
  res.status(200).json(req.usuario);
};

const crearUsuario = async (req, res) => {
  try {
    const { nickName } = req.body;

    const usuario = await User.create({
      nickName,
    });

    res.status(201).json({ message: "Usuario creado con exito", usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crer al usuario" });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
};
