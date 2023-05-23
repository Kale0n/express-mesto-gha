const http2 = require('http2');
const User = require('../models/user');
const { NotFoundError } = require('../utils/errors');

const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = http2.constants;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user == null) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректно введенные данные' });
      } else {
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(HTTP_STATUS_CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
      } else {
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { ...req.body }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      if (user == null) {
        throw NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
      } else if (err === 'NotFoundError') {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: err.message });
      } else {
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      if (user == null) {
        throw NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
      } else if (err === 'NotFoundError') {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: err.message });
      } else {
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
