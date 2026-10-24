const express = require("express");
const app = express();
const routerUsuarios = require("./routes/userRoutes");
const routerPosts = require("./routes/postRoutes");
const db = require("./models");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/posts", routerPosts);
app.use("/usuarios", routerUsuarios);

app.listen(PORT, async () => {
  try {
    await db.sequelize.sync();
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
  } catch (error) {
    console.error("No se pudo conectar con la base de datos:", error);
  }
});
