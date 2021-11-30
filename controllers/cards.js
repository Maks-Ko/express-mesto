const Card = require('../models/card');

// создаёт карточку
createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
    .catch(next);
};

// возвращает все карточки
getCards = (req, res, next) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(next);
};

// удаляет карточку по id
deleteCardId = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new PropertyError('NotFound', 'Объект не найден'))
    .then(card => res.send({ data: card }))
    .catch(next);
};

// поставить лайк карточке
likesCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(() => new PropertyError('NotFound', 'Объект не найден'))
    .then(card => res.send({ data: card }))
    .catch(next);
};

// удалить лайк карточки
dislikesCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new PropertyError('NotFound', 'Объект не найден'))
    .then(card => res.send({ data: card }))
    .catch(next);
};

module.exports = { createCard, getCards, deleteCardId, likesCard, dislikesCard };