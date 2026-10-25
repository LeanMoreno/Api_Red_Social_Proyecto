const { Post, Post_Images } = require("../models");
const { post } = require("../routes/postImagesRoutes");

const obtenerPostsImages = async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
};

const crearPostImage = async (req, res) => {
  try {
    const { postId } = req.params;
    const { URL, postIdBody } = req.body;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Posteo no encontrado" });
    }

    const post_image = await Post_Images.create({
      URL,
      postIdBody,
    });

    res.status(201).json(post_image);
  } catch (error) {}
};

const actualizarPostImage = async (req, res) => {
  const post_image = req.post_image;
  const { URL, postId } = req.body;

  await post_image.update({
    URL,
    postId,
  });

  res.json(post_image);
};

const modificarPostImage = async (req, res) => {
  const post_image = req.post_image;

  await post_image.update(req.body);

  res.json(post_image);
};

const eliminarPostImage = async (req, res) => {
  await req.post_image.destroy();

  res.json({
    message: "Imagen del post eliminado correctamente",
  });
};

module.exports = {
  obtenerPostsImages,
  crearPostImage,
  actualizarPostImage,
  modificarPostImage,
  eliminarPostImage,
};
