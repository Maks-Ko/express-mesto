const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findOne } = require('../models/user');

// создаёт пользователя
createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  // хешируем пароль
  bcrypt.hash(password, 10)
    .then(hash => User.create({ name, about, avatar, email, password: hash, }))
    .then((user) => res.status(201).send({ date: user }))
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') return res.status(400).send({ "message": "Переданы некорректные данные" });
      // if (err.name === 'MongoServerError') return res.status(400).send({ "message": "Неправильные почта или пароль" }); // выдаёт ошидку при совпадении email
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

// проверка почты и пароля
login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id}, 'some-secret-key', { expiresIn: '7d'});
      res.send({ token }); //  JWT в httpOnly куку
    })
    .catch((err) => res.status(401).send({ message: err.message}));
}

// возвращает текущего пользователя
getCurrentUser =(req, res) => {
  User.findById(req.user._id)
    .then(user => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Ошибка сервера' }));
}

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

module.exports = { getUsers, getUserId, createUser, updateUser, updateAvatar, login, getCurrentUser };