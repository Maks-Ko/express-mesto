const Card = require('../models/card');

// создаёт карточку
createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ "message": "Переданы некорректные данные" });
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

// возвращает все карточки
getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

// удаляет карточку по id
deleteCardId = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new PropertyError('NotFound', 'Объект не найден'))
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ "message": "Переданы некорректные данные" });
      } else if (err.name === 'ReferenceError') {
        res.status(404).send({ message: 'Объект не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

// поставить лайк карточке
likesCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(() => new PropertyError('NotFound', 'Объект не найден'))
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ "message": "Переданы некорректные данные" });
      } else if (err.name === 'ReferenceError') {
        res.status(404).send({ message: 'Объект не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

// удалить лайк карточки
dislikesCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new PropertyError('NotFound', 'Объект не найден'))
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ "message": "Переданы некорректные данные" });
      } else if (err.name === 'ReferenceError') {
        res.status(404).send({ message: 'Объект не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = { createCard, getCards, deleteCardId, likesCard, dislikesCard };