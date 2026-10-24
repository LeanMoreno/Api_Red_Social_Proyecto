const Joi = require("joi");

const postSchema = Joi.object({
  descripcion: Joi.string().trim().min(3).max(500).required().messages({
    "string.empty": "el post debe tener descripcion",
    "string.min": "la descripcion debe tener al menos 3 caracteres",
    "string.max": "la descripcion no puede superar los 500 caracteres",
    "any.required": "la descripcion es obligatoria",

    idUser : Joi.number().integer().positive().required().messages({
      "number.base": "El id usuario debe ser un número",
      "number.positive": "El id usuario no puede ser negativo",
      "any.required": "El id usuario es obligatorio",
    })
    
  }),
});

const idPostSchema = Joi.number().integer().positive().required().messages({
  "number.base": "El id del post debe ser un número",
  "number.positive": "El id del post no puede ser negativo",
  "any.required": "El id del post es obligatorio",
});

module.exports = {
  postSchema,
  idPostSchema,
};