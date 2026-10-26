const { User, Post, Tag, Post_Images, Comment } = require("../models");

const obtenerPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "descripcion", "userId", "createdAt", "updatedAt"],
      include: [
        {
          model: User,
          as: "usuario",
          attributes: ["nickName"],
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["nombre"],
          through: { attributes: [] }, // Elimina los metadatos de la tabla intermedia PostTags
        },
        {
          model: Post_Images,
          as: "imagenes",
          attributes: ["id", "url"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts" });
  }
};

const obtenerPost = async (req, res) => {
  try {
    const post = await req.post.reload({
      include: [
        {
          model: User,
          as: "usuario",
          attributes: ["nickName"],
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
        {
          model: Comment,
          as: "comentarios",
          attributes: ["id", "descripcion", "userId", "postId", "createdAt", "updatedAt"],
          include: [
            {
              model: User,
              as: "usuario",
              attributes: ["nickName"],
            },
          ],
        },
        {
          model: Post_Images,
          as: "imagenes",
          attributes: ["id", "url"],
        },
      ],
    });
    //aca filtro los comentarios por antiguedad
    const postJson = post.toJSON();
    postJson.comentarios = post.comentarios
      .filter((comentario) => comentario.visible)
      .map((comentario) => comentario.toJSON());

    res.json(postJson);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el post" });
  }

};

const crearPost = async (req, res) => {
  try {
    const { descripcion, userId } = req.body;
    const usuario = await User.findByPk(userId);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const post = await Post.create({
      descripcion,
      userId,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts" });
  }
};

const actualizarPost = async (req, res) => {
  try {
    const { descripcion, userId } = req.body;
    const usuario = await User.findByPk(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const post = req.post;

    await post.update({
      descripcion,
      userId,
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el post" });
  }

};

const modificarPost = async (req, res) => {
  try {
    const post = req.post;

    await post.update(req.body);

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al modificar el post" });
  }
};

const eliminarPost = async (req, res) => {
  try {
    await req.post.destroy();

    res.json({
      message: "Post eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el post" });
  }

};

module.exports = {
  obtenerPosts,
  obtenerPost,
  crearPost,
  actualizarPost,
  modificarPost,
  eliminarPost,
};
