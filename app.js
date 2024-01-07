const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { router } = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '659937d9092e2f31fcca9222',
  };
  next();
});

app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
