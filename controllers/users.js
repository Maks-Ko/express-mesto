const User = require('../models/user');

// создаёт пользователя
createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ "message": "Переданы некорректные данные при создании пользователя" });
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

// возвращает пользователя по _id
getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(404).send({ "message": "Пользователь по указанному _id не найден" });
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

// возвращает всех пользователей
getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

// обновляет профиль
updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(400).send({ "message": "Переданы некорректные данные при обновлении профиля" });
  };

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(404).send({ "message": "Пользователь с указанным _id не найден" });
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

// обновляет аватар
updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    return res.status(400).send({ "message": "Переданы некорректные данные" });
  };

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(404).send({ "message": "Пользователь с указанным _id не найден" });
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports = { getUsers, getUserId, createUser, updateUser, updateAvatar };