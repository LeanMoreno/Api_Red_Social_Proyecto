const { Router } = require("express");
const router = Router();
const commentControllers = require("../controllers/commentControllers");
const buscarComentarioPorId = require("../middlewares/buscarComentarioPorId");
const validarIdComentario = require("../middlewares/validarIdComentario");
const validarComentario = require("../middlewares/validarComentario");

router.get("/", commentControllers.obtenerComentarios);

router.get(
  "/:id",
  validarIdComentario,
  buscarComentarioPorId,
  commentControllers.obtenerComentario,
);
router.post("/", validarComentario, commentControllers.crearComentario);
router.put(
  "/:id",
  validarIdComentario,
  buscarComentarioPorId,
  validarComentario,
  commentControllers.actualizarComentario,
);
router.delete(
  "/:id",
  validarIdComentario,
  buscarComentarioPorId,
  commentControllers.eliminarComentario,
);

module.exports = router;
