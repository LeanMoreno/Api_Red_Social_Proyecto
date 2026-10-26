const { Tag } = require("../models");

const buscarTagPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id, {
      attributes: ["id", "nombre"],
    });
    if (!tag) {
      return res.status(404).json({ message: "Tag no encontrado" });
    }
    req.tag = tag;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el tag" });
  }
};

module.exports = buscarTagPorId;
