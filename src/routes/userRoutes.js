const { Router } = require("express");
const router = Router();
const userControllers = require("../Controllers/userControllers");
const buscarUsuarioPorId = require("../middlewares/buscarUsuarioPorId");
const validarId = require("../middlewares/validarId");
const validarUsuario = require("../middlewares/validarUsuario");

router.get("/", userControllers.obtenerUsuarios);

router.get(
  "/:id",
  validarId,
  buscarUsuarioPorId,
  userControllers.obtenerUsuario,
);
router.post("/", validarUsuario, userControllers.crearUsuario);

module.exports = router;
