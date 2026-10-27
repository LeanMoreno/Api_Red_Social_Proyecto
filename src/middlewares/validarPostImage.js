const fs = require("fs");
const { postImageSchema } = require("../schemas/postImageSchemas.js");

const validarPostImage = async (req, res, next) => {
  // Si no se envió ni un archivo físico ni una URL
  if (!req.file && (!req.body || !req.body.url)) {
    return res.status(400).json({
      message: "Datos invalidos",
      error: "Debe enviar un archivo en el campo 'imagen' o una URL en 'url'",
    });
  }

  const { error, value } = postImageSchema.validate(req.body);

  if (error) {
    // Si se había subido un archivo temporal pero la validación falló, lo borramos
    if (req.file && req.file.path) {
      try {
        await fs.promises.unlink(req.file.path);
      } catch (err) {
        // Ignorar si ya no existía
      }
    }

    return res
      .status(400)
      .json({ message: "Datos invalidos", error: error.details[0].message });
  }

  // Asignar los valores convertidos/coerced (por ejemplo postId a número)
  req.body = { ...req.body, ...value };
  next();
};

module.exports = validarPostImage;
