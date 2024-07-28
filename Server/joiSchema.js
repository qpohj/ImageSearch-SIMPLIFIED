const Joi = require("joi");

const schemaAddFav = Joi.object({
    userNickname: Joi.string().required(),
    imageURL: Joi.string().uri().required(),
});


const schemaRemoveFav = Joi.object({
    userNickname: Joi.string().required(),
    imageURL: Joi.string().uri().required(),
});

module.exports = { schemaAddFav, schemaRemoveFav };