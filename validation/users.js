const Joi = require("joi");

exports.register = {
  body: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in", "org"] },
      })
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    repeat_password: Joi.ref("password"),
  })
}

exports.login = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
}