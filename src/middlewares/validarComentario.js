const { comentarioSchema } = require("../schemas/commentSchemas");

const validarComentario = (req, res, next) => {
  const { error } = comentarioSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Datos invalidos", error: error.details[0].message });
  }
  next();
};

module.exports = validarComentario;
