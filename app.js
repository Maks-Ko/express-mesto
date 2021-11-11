const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// подключение к серверу mongo
mongoose.connect('')

// роутер для запросов пользователя
app.use('/users', routes);
// app.get('/users', getUsers); // возвращает всех пользователей
// app.get('/users/:userId', getUserId); // возвращает пользователя по _id
// app.post('/users', createUser); // создаёт пользователя

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});