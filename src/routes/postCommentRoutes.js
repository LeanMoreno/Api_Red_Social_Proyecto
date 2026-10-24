const { Router } = require("express");
const router = Router({ mergeParams: true });
const commentControllers = require("../controllers/commentControllers");
const validarIdPost = require("../middlewares/validarIdPost");
const buscarPostPorId = require("../middlewares/buscarPostPorId");

router.get(
  "/",
  validarIdPost,
  buscarPostPorId,
  commentControllers.obtenerComentariosPorPost,
);

module.exports = router;
