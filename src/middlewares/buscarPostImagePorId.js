const { Post, Post_Images } = require("../models");

const buscarPostImagePorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post_image = await Post_Images.findByPk(id);

    if (!post_image) {
      return res.status(404).json({
        message: "Imagen del post no encontrada",
      });
    }

    req.post_image = post_image;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar la imagen del post",
    });
  }
};


module.exports = buscarPostImagePorId;
