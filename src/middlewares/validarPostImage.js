const { postImageSchema } = require("../schemas/postImageSchemas.js");

const validarPostImage = (req, res, next) => {
  const { error } = postImageSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Datos invalidos", error: error.details[0].message });
  }
  next();
};

module.exports = validarPostImage;
