const http2 = require('http2');
const Card = require('../models/card');
const { NotFoundError } = require('../utils/errors');

const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = http2.constants;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(HTTP_STATUS_CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
      } else {
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card == null) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.send({ message: 'Пост удален' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректно введенные данные' });
      } else if (err.name === 'NotFoundError') {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: err.message });
      } else {
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card == null) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректно введенные данные' });
      } else if (err.name === 'NotFoundError') {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: err.message });
      } else {
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card == null) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректно введенные данные' });
      } else if (err.name === 'NotFoundError') {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: err.message });
      } else {
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
