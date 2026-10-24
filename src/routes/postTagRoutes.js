const { Router } = require("express");
const router = Router({ mergeParams: true });
const tagControllers = require("../controllers/tagControllers");

router.post("/:tagId", tagControllers.agregarTagAPost);
router.delete("/:tagId", tagControllers.quitarTagDePost);

module.exports = router;
