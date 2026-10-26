const { Tag, Post } = require("../models");

const obtenerTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      attributes: ["id", "nombre"],
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los tags" });
  }
};

const obtenerTag = async (req, res) => {
  res.status(200).json(req.tag);
};

const obtenerPostsPorTag = async (req, res) => {
  try {
    const posts = await req.tag.getPosts({
      attributes: ["id", "descripcion", "userId", "createdAt"],
      joinTableAttributes: [],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los posts del tag" });
  }
};

const crearTag = async (req, res) => {
  try {
    const { nombre } = req.body;

    const tag = await Tag.create({
      nombre,
    });

    res.status(201).json({ message: "Tag creado con exito", tag });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "El tag ya existe" });
    }
    console.error(error);
    res.status(500).json({ message: "Error al crear el tag" });
  }
};

const actualizarTag = async (req, res) => {
  try {
    const tag = req.tag;
    const { nombre } = req.body;

    await tag.update({
      nombre,
    });

    res.status(200).json({ message: "Tag actualizado con exito", tag });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "El tag ya existe" });
    }
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el tag" });
  }
};

const eliminarTag = async (req, res) => {
  try {
    const tag = req.tag;

    await tag.destroy();

    res.status(200).json({ message: "Tag eliminado con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el tag" });
  }
};

const agregarTagAPost = async (req, res) => {
  try {
    const { id, tagId } = req.params;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Tag no encontrado" });
    }

    const yaAsociado = await post.hasTag(tag);
    if (yaAsociado) {
      return res
        .status(409)
        .json({ message: "El tag ya esta asociado al post" });
    }

    await post.addTag(tag);

    res.status(200).json({ message: "Tag asociado al post correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al asociar el tag" });
  }
};

const quitarTagDePost = async (req, res) => {
  try {
    const { id, tagId } = req.params;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Tag no encontrado" });
    }

    const estaAsociado = await post.hasTag(tag);
    if (!estaAsociado) {
      return res
        .status(404)
        .json({ message: "El tag no esta asociado al post" });
    }

    await post.removeTag(tag);

    res.status(200).json({ message: "Tag desasociado del post correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al desasociar el tag" });
  }
};

module.exports = {
  obtenerTags,
  obtenerTag,
  obtenerPostsPorTag,
  crearTag,
  actualizarTag,
  eliminarTag,
  agregarTagAPost,
  quitarTagDePost,
};
