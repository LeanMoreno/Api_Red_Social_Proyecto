const { Router } = require("express");
const router = Router();
const userControllers = require("../controllers/userControllers");
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

router.put(
  "/:id",
  validarId,
  buscarUsuarioPorId,
  userControllers.actualizarUsuario,
);
/*
router.patch("/:id", usuariosControllers.modificarUsuario);

router.delete("/:id", usuariosControllers.eliminarUsuario);
*/
module.exports = router;
