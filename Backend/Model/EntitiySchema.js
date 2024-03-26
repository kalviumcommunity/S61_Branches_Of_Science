const Joi = require("joi");

const EntitySchema = Joi.object({
  ID: Joi.number().integer().required(),
  Title: Joi.string().required(),
  Toughness: Joi.number().required(),
  "Needed basics": Joi.array().items(Joi.string()).required(),
  Popularity: Joi.number().required(),
  "Time takes": Joi.string().required(),
  "Overall grade": Joi.number().required(),
  Description: Joi.string().required(),
});

module.exports = EntitySchema;
