const Joi = require("joi");

const schemaAddFav = Joi.object({
    userEmail: Joi.string().email().required(),
    imageURL: Joi.string().uri().required(),
});


const schemaRemoveFav = Joi.object({
    userEmail: Joi.string().email().required(),
    imageURL: Joi.string().uri().required(),
});

module.exports = { schemaAddFav, schemaRemoveFav };