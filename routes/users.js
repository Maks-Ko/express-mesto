const router = require('express').Router();

// возвращает всех пользователей
router.get('/users', (req, res) => {
  // res.send(users);
});

// возвращает пользователя по _id
router.get('/users/:userId', (req, res) => {
  // res.send(req.params);
});

// создаёт пользователя
router.post('/users', (req, res) => {
  //
});

module.exports = { getUsers, getUserId, createUser };