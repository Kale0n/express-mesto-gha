const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_REGEXP } = require('../utils/regexps');

const {
  getUsers, findUser, updateUser, updateUserAvatar, getMe,
} = require('../controllers/users');

userRouter.get('/', getUsers);

userRouter.get('/me', getMe);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), findUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(URL_REGEXP),
  }),
}), updateUserAvatar);

module.exports = userRouter;
