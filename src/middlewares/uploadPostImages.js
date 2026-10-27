const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },

  filename: (req, file, cb) => {
    const sufijoUnico = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, sufijoUnico + path.extname(file.originalname).toLowerCase());
  },
});

const filtroImagen = (req, file, cb) => {
  const extensionesPermitidas = /jpg|jpeg|png|webp|gif/;
  const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
  const esValida = extensionesPermitidas.test(ext);
  const esMimeValido = file.mimetype && file.mimetype.startsWith("image/");

  if (esValida && esMimeValido) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos de imagen (jpg, jpeg, png, webp, gif)"));
  }
};

const upload = multer({
  storage: almacenamiento,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: filtroImagen,
});

const uploadPostImages = (req, res, next) => {
  upload.single("imagen")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "La imagen no debe superar los 5 MB" });
      }
      return res
        .status(400)
        .json({ message: `Error al subir la imagen: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

module.exports = uploadPostImages;
