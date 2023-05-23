const userRouter = require('express').Router();
const {
  getUsers, findUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);

userRouter.get('/:userId', findUser);

userRouter.post('/', createUser);

userRouter.patch('/me', updateUser);

userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
