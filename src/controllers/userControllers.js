const { User } = require("../models");

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: ["id", "nickName"],
    });
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

const actualizarUsuario = async (req, res) => {
  try {
    const usuario = req.usuario;
    const { nickName } = req.body;

    await usuario.update({
      nickName,
    });

    res
      .status(200)
      .json({ message: "Usuario actualizado con exito!!!", usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar el producto",
    });
  }
};

const modificarUsuario = async (req, res) => {
  try {
    const usuario = req.usuario;

    usuario.nickName = req.body.nickName;

    await usuario.save();

    res.status(200).json({
      message: "Usuario modificado con éxito",
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al modificar el usuario",
    });
  }
};
const eliminarUsuario = async (req, res) => {
  try {
    const usuario = req.usuario;

    await usuario.destroy();

    res.status(200).json({
      message: "Usuario eliminado con éxito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar el usuario",
    });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  modificarUsuario,
  eliminarUsuario,
};
