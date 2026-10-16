const Joi = require("joi");

const usuarioSchema = Joi.object({
  nickName: Joi.string().min(3).max(100).required().messages({
    "string.empty": "El nombre no puede estar vacío",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede superar los 100 caracteres",
    "any.required": "El nombre es obligatorio",
  }),
});

module.exports = {
  usuarioSchema,
};
