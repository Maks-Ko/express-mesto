const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { createUser, login } = require('./controllers/users')
const auth = require('./middlewares/auth');


const { PORT = 3000 } = process.env;
const app = express();

// подключение к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/', users);
app.use('/', cards);

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ "message": "Переданы некорректные данные" });
  } else if (err.name === 'Error') {
    res.status(401).send({ "message": err.message });
  } else if (err.name === 'ReferenceError') {
      res.status(404).send({ message: 'Объект не найден' });
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    res.status(409).send({ "message": "Пользователь с таким email уже существует" });
  } else {
    res.status(500).send({ message: 'Ошибка сервера' });
  }
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});