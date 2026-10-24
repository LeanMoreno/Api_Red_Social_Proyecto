const { idComentarioSchema } = require("../schemas/commentSchemas");

const validarIdComentario = (req, res, next) => {
  const { id } = req.params;
  const idNumero = Number(id);
  const { error } = idComentarioSchema.validate(idNumero);

  if (error) {
    return res
      .status(400)
      .json({ message: "Datos invalidos", error: error.details[0].message });
  }
  next();
};

module.exports = validarIdComentario;
