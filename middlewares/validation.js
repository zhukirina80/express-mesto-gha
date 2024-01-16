const { celebrate, Joi } = require('celebrate');

const validationUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri({ scheme: ['http', 'https'] }),
  }),
});

const validationGetRequest = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

const validationGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri({ scheme: ['http', 'https'] }),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri({ scheme: ['http', 'https'] }),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

const validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

module.exports = {
  validationUser,
  validationGetRequest,
  validationGetUserById,
  validationUpdateUser,
  validationUpdateAvatar,
  validationCreateCard,
  validationCardId,
};
