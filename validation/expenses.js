const Joi = require("joi");

exports.create = {
	body: Joi.object({
		amount: Joi.number().required(),
		description: Joi.string().allow(null).optional(),
		date:Joi.date().allow(null),
	})
}

exports.getById = {
	params: Joi.object({
		id: Joi.number().integer().required(),
	})
}

exports.update = {
	body: Joi.object({
		user_id: Joi.number().integer().optional(),
		amount: Joi.number().optional(),
		description: Joi.string().allow(null).optional(),
		date:Joi.date().allow(null).optional(),
	})
}