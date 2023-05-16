const Card = require('../models/card.js');
const { NotFoundError } = require('../utils/errors')

module.exports.getCards = (req, res) => {
  Card.find({})
  .then(cards => res.send({ data: cards }))
  .catch((err) => {
    res.status(500).send({ message: 'Произошла ошибка'})
  });
};

module.exports.createCard = (req, res) =>  {
  const {name, link} = req.body;
  Card.create({name, link, owner: req.user._id})
  .then(card => res.send({ data: card }))
  .catch((err) =>{
    if (err.name == 'ValidationError') {
      res.status(400).send({message: err.message})
    } else {
      res.status(500).send({ message: 'Произошла ошибка'})
    }
  })
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
  .then((card) => {
      if (card == null) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.send({message:"Пост удален"})
    })
  .catch((err) => {
    if (err.name == 'ValidationError' || err.name == "CastError") {
      res.status(400).send({ message: "Некорректно введенные данные"})
    } else if (err.name == 'NotFoundError') {
      res.status(404).send({message: err.message})
    } else {
      res.status(500).send({ message: 'Произошла ошибка'})
    }
  });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then(card => {
    if (card == null) {
      throw new NotFoundError('Карточка с указанным _id не найдена.')
    }
    res.send({ data: card })}
  )
  .catch((err) => {
    if (err.name == 'ValidationError' || err.name == "CastError") {
      res.status(400).send({ message: "Некорректно введенные данные"})
    } else if (err.name == 'NotFoundError') {
        res.status(404).send({ message: err.message })
    } else {
        res.status(500).send({ message: 'Произошла ошибка'})
    }
  })
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then(card => {
    if (card == null) {
      throw new NotFoundError('Карточка с указанным _id не найдена.')
    }
    res.send({ data: card })}
  )
  .catch((err) =>{
    if (err.name == 'ValidationError' || err.name == "CastError") {
        res.status(400).send({ message: "Некорректно введенные данные"})
    } else if (err.name == 'NotFoundError') {
        res.status(404).send({ message: err.message })
    } else {
        res.status(500).send({ message: 'Произошла ошибка'})
    }
  })
}