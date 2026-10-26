const { tagSchema } = require("../schemas/tagSchemas");

const validarTag = (req, res, next) => {
  const { error } = tagSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Datos invalidos", error: error.details[0].message });
  }
  next();
};

module.exports = validarTag;
