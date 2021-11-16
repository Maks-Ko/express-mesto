const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

// подключение к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', users);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});