const { Comment, User } = require("../models");

const buscarComentarioPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comentario = await Comment.findByPk(id, {
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
    if (!comentario) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
    req.comentario = comentario;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el comentario" });
  }
};

module.exports = buscarComentarioPorId;
