const Joi = require('@hapi/joi')


const validation = data => {
    const scheme = Joi.object({
    Name: Joi.string().min(4).required(),
    Email: Joi.string().email().required(),
    NIP: Joi.string().min(6).required(),
    Password: Joi.string().min(6).required(),
    role: Joi.string().min(4).required(),
  });
  return scheme.validate(data)
}

module.exports.validation = validation