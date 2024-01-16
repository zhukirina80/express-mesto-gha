const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { router } = require('./routes');
const auth = require('./middlewares/auth');
const serverError = require('./middlewares/serverError');
const { validationUser } = require('./middlewares/validation');
const {
  createUser, login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());

app.use(express.json());

app.post('/signin', validationUser, login);

app.post('/signup', validationUser, createUser);

app.use(auth);

app.use(router);

app.use(errors());

app.use(serverError);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
