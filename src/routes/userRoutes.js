const { Router } = require("express");
const router = Router();
const userControllers = require("../controllers/userControllers");
const buscarUsuarioPorId = require("../middlewares/buscarUsuarioPorId");
const validarId = require("../middlewares/validarId");
const validarUsuario = require("../middlewares/validarUsuario");
const validarTargetId = require("../middlewares/validarTargetId");

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
  validarUsuario,
  userControllers.actualizarUsuario,
);

router.patch("/:id",
  validarId,
  buscarUsuarioPorId,
  userControllers.modificarUsuario);

router.delete("/:id",
  validarId,
  buscarUsuarioPorId,
  userControllers.eliminarUsuario);

router.post("/:id/seguir/:targetId",
  validarId,
  validarTargetId,
  buscarUsuarioPorId,
  userControllers.seguirUsuario);

router.delete("/:id/dejar-de-seguir/:targetId",
  validarId,
  validarTargetId,
  buscarUsuarioPorId,
  userControllers.dejarDeSeguirUsuario);

router.get("/:id/seguidores",
  validarId,
  buscarUsuarioPorId,
  userControllers.obtenerSeguidores);

router.get("/:id/seguidos",
  validarId,
  buscarUsuarioPorId,
  userControllers.obtenerSeguidos);


module.exports = router;
