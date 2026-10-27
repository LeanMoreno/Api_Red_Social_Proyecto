const Joi = require("joi");

const schemaTargetId = Joi.object({
    targetId: Joi.number().integer().positive().required().messages({
        "number.base": "El targetId debe ser un número",
        "number.integer": "El targetId debe ser un entero",
        "number.positive": "El targetId debe ser un número positivo",
        "any.required": "El targetId es obligatorio",
    }),
});

const validarTargetId = (req, res, next) => {
    const { error } = schemaTargetId.validate({ targetId: req.params.targetId });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = validarTargetId;
