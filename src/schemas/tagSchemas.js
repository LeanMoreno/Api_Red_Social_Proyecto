const Joi = require("joi");

const tagSchema = Joi.object({
  nombre: Joi.string().max(50).required().messages({
    "string.empty": "El nombre no puede estar vacío",
    "string.max": "El nombre no puede superar los 50 caracteres",
    "any.required": "El nombre es obligatorio",
  }),
});

const idTagSchema = Joi.number().integer().min(1).required().messages({
  "number.base": "El id del tag debe ser un número",
  "number.min": "El id del tag debe ser mayor a 0",
  "any.required": "El id del tag es obligatorio",
});

module.exports = {
  tagSchema,
  idTagSchema,
};
