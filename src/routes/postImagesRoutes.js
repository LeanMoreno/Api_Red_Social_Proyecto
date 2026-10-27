const { Router } = require("express");
const router = Router({ mergeParams: true });
const postImagesControllers = require("../controllers/postImagesControllers");
const validarPostImage = require("../middlewares/validarPostImage");
const validarIdPostImage = require("../middlewares/validarIdPostImage");
const buscarPostImagePorId = require("../middlewares/buscarPostImagePorId");
const uploadPostImage = require("../middlewares/uploadPostImage");

router.get("/", postImagesControllers.obtenerPostsImages);

router.get(
  "/:id",
  validarIdPostImage,
  buscarPostImagePorId,
  postImagesControllers.obtenerPostImage,
);

router.post(
  "/",
  uploadPostImage.single("imagen"),
  postImagesControllers.crearPostImage
);

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
