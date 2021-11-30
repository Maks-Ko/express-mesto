const User = require('../models/user');
const bcrypt = require('bcryptjs');

// создаёт пользователя
createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  // хешируем пароль
  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ date: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ "message": "Переданы некорректные данные" });
      res.status(500).send({ message: 'Ошибка сервера' });
    });

  // User.create({ name, about, avatar })
  //   .then(user => res.send({ data: user }))
  //   .catch((err) => {
  //     if (err.name === 'ValidationError') return res.status(400).send({ "message": "Переданы некорректные данные" });
  //     res.status(500).send({ message: 'Ошибка сервера' });
  //   });
};

// возвращает пользователя по _id
getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new PropertyError('NotFound', 'Объект не найден'))
    .then(user => res.send({ data: user }))
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

// возвращает всех пользователей
getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Ошибка сервера' }));
};

// обновляет профиль
updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(400).send({ "message": "Переданы некорректные данные при обновлении профиля" });
  };

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => new PropertyError('NotFound', 'Объект не найден'))
    .then(user => res.send({ data: user }))
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

// обновляет аватар
updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    return res.status(400).send({ "message": "Переданы некорректные данные" });
  };

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => new PropertyError('NotFound', 'Объект не найден'))
    .then(user => res.send({ data: user }))
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

module.exports = { getUsers, getUserId, createUser, updateUser, updateAvatar };