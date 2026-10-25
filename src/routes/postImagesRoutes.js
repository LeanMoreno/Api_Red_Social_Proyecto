const { Router } = require("express");
const router = Router();
const postImagesControllers = require("../controllers/postImagesControllers");
const validarPostImage = require("../middlewares/validarPostImage");
const validarIdPostImage = require("../middlewares/validarIdPostImage");
const buscarPostImagePorId = require("../middlewares/buscarPostImagePorId");

router.get("/", postImagesControllers.obtenerPostsImages);

router.get(
  "/:id",
  validarIdPostImage,
  buscarPostImagePorId,
  postImagesControllers.obtenerPostsImages,
);

router.post("/", validarPostImage, postImagesControllers.crearPostImage);

router.put(
  "/:id",
  validarIdPostImage,
  buscarPostImagePorId,
  validarPostImage,
  postImagesControllers.actualizarPostImage,
);

router.delete(
  "/:id",
  validarIdPostImage,
  buscarPostImagePorId,
  postImagesControllers.eliminarPostImage,
);

module.exports = router;
