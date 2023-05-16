const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users.js')
const cardRouter = require('./routes/cards.js')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '6460ec8567a1042b6c1da233'
  };

  next();
});

app.use('/users', userRouter)
app.use('/cards', cardRouter)
app.patch('*', function(req, res){
  res.status(404).send({message: "Страница не найдена"});
});

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})