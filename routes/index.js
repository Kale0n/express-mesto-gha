const indexRouter = require('express').Router();

const cardRouter = require('./cards');
const userRouter = require('./users');

indexRouter.use('/users', userRouter);
indexRouter.use('/cards', cardRouter);

module.exports = indexRouter;
