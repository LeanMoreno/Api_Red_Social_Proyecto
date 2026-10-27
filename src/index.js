const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

dotenv.config();

const routerUsuarios = require("./routes/userRoutes");
const routerPosts = require("./routes/postRoutes");
const routerComentarios = require("./routes/commentRoutes");
const routerComentariosPost = require("./routes/postCommentRoutes");
const routerTags = require("./routes/tagRoutes");
const routerTagsPost = require("./routes/postTagRoutes");
const routerPostImages = require("./routes/postImagesRoutes");

const db = require("./models");

const PORT = process.env.PORT || 3000;

app.use(express.json());


const swaggerDocument = YAML.load(path.join(__dirname, "docs", "swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/posts/:id/comentarios", routerComentariosPost);
app.use("/posts/:id/tags", routerTagsPost);
app.use("/posts/image", routerPostImages);
app.use("/posts", routerPosts);
app.use("/usuarios", routerUsuarios);
app.use("/comentarios", routerComentarios);
app.use("/tags", routerTags);
app.use("/uploads",express.static(path.join(process.cwd(), "uploads")));

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada." });
});

app.listen(PORT, async () => {
  try {
    await db.sequelize.sync();
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
  } catch (error) {
    console.error("No se pudo conectar con la base de datos:", error);
  }
});
