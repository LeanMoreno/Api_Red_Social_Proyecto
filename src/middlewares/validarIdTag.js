const { idTagSchema } = require("../schemas/tagSchemas");

const validarIdTag = (req, res, next) => {
  const { id } = req.params;
  const idNumero = Number(id);
  const { error } = idTagSchema.validate(idNumero);

  if (error) {
    return res
      .status(400)
      .json({ message: "Datos invalidos", error: error.details[0].message });
  }
  next();
};

module.exports = validarIdTag;
