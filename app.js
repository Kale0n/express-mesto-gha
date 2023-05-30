const http2 = require('http2');
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { celebrate, Joi, errors } = require('celebrate');
const indexRouter = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { errorsHandler } = require('./middlewares/errors');
const { URL_REGEXP } = require('./utils/regexps');

const app = express();

const { HTTP_STATUS_NOT_FOUND } = http2.constants;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_REGEXP),
    email: Joi.string().email().required(),
    password: Joi.string().required(),

  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/', indexRouter);
app.patch('*', (req, res) => {
  res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.use(errors());

app.use(errorsHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
