const { Comment, User, Post } = require("../models");

const obtenerComentarios = async (req, res) => {
  try {
    const comentarios = await Comment.findAll({
      attributes: [
        "id",
        "descripcion",
        "userId",
        "postId",
        "createdAt",
        "visible",
      ],
      include: [
        {
          model: User,
          as: "usuario",
          attributes: ["nickName"],
        },
      ],
    });
    res.status(200).json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los comentarios" });
  }
};

const obtenerComentario = async (req, res) => {
  res.status(200).json(req.comentario);
};

const obtenerComentariosPorPost = async (req, res) => {
  try {
    const comentarios = await Comment.findAll({
      where: { postId: req.post.id },
      attributes: ["id", "descripcion", "userId", "postId", "createdAt"],
      include: [
        {
          model: User,
          as: "usuario",
          attributes: ["nickName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res
      .status(200)
      .json(comentarios.filter((comentario) => comentario.visible));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los comentarios" });
  }
};

const crearComentario = async (req, res) => {
  try {
    const { descripcion, userId, postId } = req.body;

    const usuario = await User.findByPk(userId);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    const comentario = await Comment.create({
      descripcion,
      userId,
      postId,
    });

    res
      .status(201)
      .json({ message: "Comentario creado con exito", comentario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el comentario" });
  }
};

const actualizarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, userId, postId } = req.body;

    const usuario = await User.findByPk(userId);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    const comentario = await Comment.findByPk(id);

    await comentario.update({
      descripcion,
      userId,
      postId,
    });

    res
      .status(200)
      .json({ message: "Comentario actualizado con exito", comentario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el comentario" });
  }
};

const eliminarComentario = async (req, res) => {
  try {
    const comentario = req.comentario;

    await comentario.destroy();

    res.status(200).json({ message: "Comentario eliminado con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el comentario" });
  }
};

module.exports = {
  obtenerComentarios,
  obtenerComentario,
  obtenerComentariosPorPost,
  crearComentario,
  actualizarComentario,
  eliminarComentario,
};
