const { Post } = require("../models");

const obtenerPosts = async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
};

const obtenerPost = async (req, res) => {
  res.json(req.post);
};

const crearPost = async (req, res) => {
  const { descripcion, userId } = req.body;

  const post = await Post.create({
    descripcion,
    userId,
  });

  res.status(201).json(post);
};

const actualizarPost = async (req, res) => {
  const post = req.post;
  const { descripcion, userId } = req.body;

  await post.update({
    descripcion,
    userId,
  });

  res.json(post);
};

const modificarPost = async (req, res) => {
  const post = req.post;

  await post.update(req.body);

  res.json(post);
};

const eliminarPost = async (req, res) => {
  await req.post.destroy();

  res.json({
    message: "Post eliminado correctamente",
  });
};

module.exports ={
  obtenerPosts,
  obtenerPost,
  crearPost,
  actualizarPost,
  modificarPost,
  eliminarPost,
  
};
