const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { URL_REGEXP } = require('../utils/regexps');

cardRouter.get('/', celebrate({
  body: Joi.object().keys({
  }),
}), getCards);

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REGEXP),
  }),
}), createCard);

cardRouter.delete('/:id', celebrate({
  body: Joi.object().keys({
  }),
}), deleteCard);

cardRouter.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
  }),
}), likeCard);

cardRouter.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
  }),
}), dislikeCard);

module.exports = cardRouter;
