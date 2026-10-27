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
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "El nickName ya está en uso" });
    }
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario" });
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
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "El nickName ya esta en uso" });
    }
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar el usuario",
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
      message: "Usuario eliminado con exito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar el usuario",
    });
  }
};

const seguirUsuario = async (req, res) => {
  try {
    const { id, targetId } = req.params;

    if (id === targetId) {
      return res.status(400).json({ message: "Un usuario no puede seguirse a si mismo" });
    }

    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario origen no encontrado" });
    }

    const usuarioASeguir = await User.findByPk(targetId);
    if (!usuarioASeguir) {
      return res.status(404).json({ message: "Usuario a seguir no encontrado" });
    }

    const yaLoSigue = await usuario.hasFollowing(usuarioASeguir);
    if (yaLoSigue) {
      return res.status(409).json({ message: "Ya sigues a este usuario" });
    }

    await usuario.addFollowing(usuarioASeguir);
    res.status(200).json({ message: "Usuario seguido con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al seguir al usuario" });
  }
};

const dejarDeSeguirUsuario = async (req, res) => {
  try {
    const { id, targetId } = req.params;

    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario origen no encontrado" });
    }

    const usuarioADejar = await User.findByPk(targetId);
    if (!usuarioADejar) {
      return res.status(404).json({ message: "Usuario a dejar de seguir no encontrado" });
    }

    const loSigue = await usuario.hasFollowing(usuarioADejar);
    if (!loSigue) {
      return res.status(404).json({ message: "No sigues a este usuario" });
    }

    await usuario.removeFollowing(usuarioADejar);
    res.status(200).json({ message: `Has dejado de seguir al usuario ${usuarioADejar.nickName} correctamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al dejar de seguir al usuario" });
  }
};

const obtenerSeguidores = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const seguidores = await usuario.getFollowers({
      attributes: ["id", "nickName"],
      joinTableAttributes: [],
    });
    res.status(200).json(seguidores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener seguidores" });
  }
};

const obtenerSeguidos = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const seguidos = await usuario.getFollowing({
      attributes: ["id", "nickName"],
      joinTableAttributes: [],
    });
    res.status(200).json(seguidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener seguidos" });
  }
};


module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  modificarUsuario,
  eliminarUsuario,
  seguirUsuario,
  dejarDeSeguirUsuario,
  obtenerSeguidores,
  obtenerSeguidos,
};
