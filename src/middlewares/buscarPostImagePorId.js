const { Post, Post_Images } = require("../models");

const buscarPostImagePorId = async (req, res, next) => {
  try {
    const { postId, postImage_id } = req.params;
    const post = await Post.findByPk(postId);
    const post_image = await Post_Images.findByPk(postImage_id);

    if (!post) {
      return res.status(404).json({
        message: "Post no encontrado",
      });
    }

    if (!post_image) {
      return res.status(404).json({
        message: "Imagen del post no encontrado",
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
