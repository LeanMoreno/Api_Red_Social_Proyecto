const { Router } = require("express");
const router = Router();
const tagControllers = require("../controllers/tagControllers");
const buscarTagPorId = require("../middlewares/buscarTagPorId");
const validarIdTag = require("../middlewares/validarIdTag");
const validarTag = require("../middlewares/validarTag");

router.get("/", tagControllers.obtenerTags);

router.get("/:id", validarIdTag, buscarTagPorId, tagControllers.obtenerTag);
router.get(
  "/:id/posts/",
  validarIdTag,
  buscarTagPorId,
  tagControllers.obtenerPostsPorTag,
);
router.post("/", validarTag, tagControllers.crearTag);
router.put(
  "/:id",
  validarIdTag,
  buscarTagPorId,
  validarTag,
  tagControllers.actualizarTag,
);
router.delete("/:id", validarIdTag, buscarTagPorId, tagControllers.eliminarTag);

module.exports = router;
