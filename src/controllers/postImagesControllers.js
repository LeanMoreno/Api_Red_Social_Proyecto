const { Post, Post_Images } = require("../models");

const obtenerPostsImages = async (req, res) => {
  try {
    const imagenes = await Post_Images.findAll({
      attributes: ["id", "url", "postId", "createdAt"],
    });
    res.status(200).json(imagenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las imágenes" });
  }
};

const obtenerPostImage = async (req, res) => {
  try {
    const post_image = req.post_image;

    res.status(200).json(post_image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la imagen del post" });
  }
}

const crearPostImage = async (req, res) => {
  try {
    // const { postId } = req.params;
    const { url, postId } = req.body;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Posteo no encontrado" });
    }

    const post_image = await Post_Images.create({
      url,
      postId,
    });

    res.status(201).json(post_image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la imagen del post" });
  }
};

const actualizarPostImage = async (req, res) => {
  try {
    const post_image = req.post_image;
    const { url, postId } = req.body;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Posteo no encontrado" });
    }

    await post_image.update({
      url,
      postId,
    });

    res.status(200).json(post_image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la imagen del post" });
  }
};

const modificarPostImage = async (req, res) => {
  try {
    const post_image = req.post_image;

    await post_image.update(req.body);

    res.json(post_image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al modificar la imagen del post" });
  }

};

const eliminarPostImage = async (req, res) => {
  try {
    await req.post_image.destroy();

    res.status(200).json({
      message: "Imagen del post eliminada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la imagen del post" });
  }
};

module.exports = {
  obtenerPostsImages,
  obtenerPostImage,
  crearPostImage,
  actualizarPostImage,
  modificarPostImage,
  eliminarPostImage,
};
