const multer = require("multer");
const path = require("path");

const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const filtroImagen = (req, file, cb) => {
  const extensionesPermitidas = /jpg|jpeg|png|webp/;

  const esValida = extensionesPermitidas.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (esValida) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes"));
  }
};

module.exports = multer({
  storage: almacenamiento,
  fileFilter: filtroImagen,
});