const Joi = require("joi");

const postImageSchema = Joi.object({
  URL: Joi.string().uri().max(500).required().messages({
    "string.empty": "La URL de la imagen no puede estar vacía",
    "string.uri":
      "La URL debe ser un enlace válido (ej. http://... o https://...)",
    "string.max": "La URL no puede superar los 500 caracteres",
    "any.required": "La URL de la imagen es obligatoria",
  }),
  postId: Joi.number().integer().positive().required().messages({
    "number.base": "El id del post debe ser un número",
    "number.positive": "El id del post no puede ser negativo",
    "any.required": "El id del post es obligatorio",
  }),
});

const idPostImageSchema = Joi.number()
  .integer()
  .positive()
  .required()
  .messages({
    "number.base": "El id de la imagen del post debe ser un número",
    "number.positive": "El id de la imagen del post no puede ser negativo",
    "any.required": "El id de la imagen del post es obligatorio",
  });

module.exports = {
  postImageSchema,
  idPostImageSchema,
};
