const Joi = require("joi");

const usuarioSchema = Joi.object({
  nickName: Joi.string().min(3).max(100).required().messages({
    "string.empty": "El nombre no puede estar vacío",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede superar los 100 caracteres",
    "any.required": "El nombre es obligatorio",
  }),
});

const idSchema = Joi.number().integer().min(1).required().messages({
  "number.base": "El precio debe ser un número",
  "number.min": "El precio no puede ser negativo",
  "any.required": "El precio es obligatorio",
});

module.exports = {
  usuarioSchema,
  idSchema,
};
