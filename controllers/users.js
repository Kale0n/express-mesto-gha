const user = require('../models/user.js');
const User= require('../models/user.js');
const { NotFoundError } = require('../utils/errors')

module.exports.getUsers = (req, res) => {
  User.find({})
  .then(users => res.send({ data: users }))
  .catch((err) => {
    res.status(500).send({ message: 'Произошла ошибка'})
  });
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.userId)
  .then((user) => {
    if (user == null) {
      throw new NotFoundError('Пользователь с указанным _id не найден.');
    }
    res.send({ data: user })
  })
.catch((err) => {
  if (err.name == 'NotFoundError') {
    res.status(404).send({message: err.message})
  } else if (err.name == 'ValidationError' || err.name == "CastError") {
    res.status(400).send({ message: "Некорректно введенные данные"})
  } else {
    res.status(500).send({ message: 'Произошла ошибка'})
  }
 });
};

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
  .then(user => res.send({ data: user }))
  .catch((err) => {
    if (err.name == 'ValidationError') {
      res.status(400).send({ message: err.message})
    } else {
      res.status(500).send({ message: 'Произошла ошибка'})
    }
  });
}

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {...req.body}, {
    new: true,
    runValidators: true,
    upsert: false
  })
  .then(user => {
    if (user == null) {
      throw NotFoundError('Пользователь с указанным _id не найден.')
    }
    res.send({ data: user })}
  )
  .catch((err) => {
    if (err.name == 'ValidationError') {
        res.status(400).send({ message: err.message})
    } else if (err == 'NotFoundError') {
        res.status(404).send({ message: err.message })
    } else {
        res.status(500).send({ message: 'Произошла ошибка'})
    }
  })
}

module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {avatar : req.body.avatar}, {
    new: true,
    runValidators: true,
    upsert: false
})
.then(user => {
  if (user == null) {
    throw NotFoundError('Пользователь с указанным _id не найден.')
  }
  res.send({ data: user })}
)
.catch((err) => {
  if (err.name == 'ValidationError') {
      res.status(400).send({ message: err.message})
  } else if (err == 'NotFoundError') {
      res.status(404).send({ message: err.message })
  } else {
      res.status(500).send({ message: 'Произошла ошибка'})
  }
 })
}