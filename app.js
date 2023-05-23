const http2 = require('http2');
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const indexRouter = require('./routes/index');

const app = express();

const { HTTP_STATUS_NOT_FOUND } = http2.constants;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '6460ec8567a1042b6c1da233',
  };

  next();
});

app.use('/', indexRouter);
app.patch('*', (req, res) => {
  res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
