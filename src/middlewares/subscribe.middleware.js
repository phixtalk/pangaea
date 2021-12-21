const Joi = require("joi");

const validateSubscriber = (data) => {
  const schema = Joi.object({
    url: Joi.string().required(),
    topic: Joi.string().required()
  });

  return schema.validate(data);
};

module.exports = {
  validateSubscriber
};