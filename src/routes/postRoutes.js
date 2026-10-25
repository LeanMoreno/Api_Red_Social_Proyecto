const { Router } = require("express");
const router = Router();

const postControllers = require("../controllers/postControllers");
const validarIdPost = require("../middlewares/validarIdPost");
const buscarPostPorId = require("../middlewares/buscarPostPorId");
const validarPost = require("../middlewares/validarPost");

router.get("/", postControllers.obtenerPosts);

router.get("/:id", validarIdPost, buscarPostPorId, postControllers.obtenerPost);

router.post("/", validarPost, postControllers.crearPost);

router.put(
  "/:id",
  validarIdPost,
  buscarPostPorId,
  validarPost,
  postControllers.actualizarPost,
);

router.patch(
  "/:id",
  validarIdPost,
  buscarPostPorId,
  postControllers.modificarPost,
);

router.delete(
  "/:id",
  validarIdPost,
  buscarPostPorId,
  postControllers.eliminarPost,
);

module.exports = router;
