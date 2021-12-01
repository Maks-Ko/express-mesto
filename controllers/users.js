const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// создаёт пользователя
createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(409).send({ "message": "Пользователь с таким email уже существует" });
      }

      // хешируем пароль
      bcrypt.hash(password, 10)
      .then(hash => User.create({ name, about, avatar, email, password: hash }))
      .then((user) => res.status(201).send({ date: user }))
      .catch(next);
    })
    .catch(next);
};

// проверка почты и пароля
login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });  // JWT в httpOnly куку
    })
    .catch(next);
}

// возвращает текущего пользователя
getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new PropertyError('NotFound', 'Объект не найден'))
    .then(user => res.send({ data: user }))
    .catch(next);
}

// возвращает пользователя по _id
getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => new PropertyError('NotFound', 'Объект не найден'))
    .then(user => res.send({ data: user }))
    .catch(next);
};

// возвращает всех пользователей
getUsers = (req, res, next) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(next);
};

// обновляет профиль
updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => new PropertyError('NotFound', 'Объект не найден'))
    .then(user => res.send({ data: user }))
    .catch(next);
};

// обновляет аватар
updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  if (!avatar) {
    return res.status(400).send({ "message": "Переданы некорректные данные" });
  };

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => new PropertyError('NotFound', 'Объект не найден'))
    .then(user => res.send({ data: user }))
    .catch(next);
};

module.exports = { getUsers, getUserId, createUser, updateUser, updateAvatar, login, getCurrentUser };