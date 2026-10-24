const Joi = require("joi");

const comentarioSchema = Joi.object({
  descripcion: Joi.string().max(500).required().messages({
    "string.empty": "La descripción no puede estar vacía",
    "string.max": "La descripción no puede superar los 500 caracteres",
    "any.required": "La descripción es obligatoria",
  }),
  userId: Joi.number().integer().positive().required().messages({
    "number.base": "El userId debe ser un número",
    "any.required": "El userId es obligatorio",
  }),
  postId: Joi.number().integer().positive().required().messages({
    "number.base": "El postId debe ser un número",
    "any.required": "El postId es obligatorio",
  }),
});

const idComentarioSchema = Joi.number().integer().min(1).required().messages({
  "number.base": "El id del comentario debe ser un número",
  "number.min": "El id del comentario debe ser mayor a 0",
  "any.required": "El id del comentario es obligatorio",
});

module.exports = {
  comentarioSchema,
  idComentarioSchema,
};
