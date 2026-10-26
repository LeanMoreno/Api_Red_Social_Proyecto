const { Post } = require("../models");

const buscarPostPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({
        message: "Post no encontrado",
      });
    }

    req.post = post;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar el post",
    });
  }
};

module.exports = buscarPostPorId;
