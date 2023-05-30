const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_REGEXP } = require('../utils/regexps');

const {
  getUsers, findUser, updateUser, updateUserAvatar, getMe,
} = require('../controllers/users');

userRouter.get('/', celebrate({
  body: Joi.object().keys({
  }),
}), getUsers);

userRouter.get('/me', celebrate({
  body: Joi.object().keys({
  }),
}), getMe);

userRouter.get('/:userId', celebrate({
  body: Joi.object().keys({
  }),
}), findUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().pattern(URL_REGEXP),
  }),
}), updateUserAvatar);

module.exports = userRouter;
