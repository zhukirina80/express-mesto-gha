const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: {
        value: true,
        message: 'Поле name является обязательным',
      },
      minlength: [2, 'Минимальная длина имени — 2 символа'],
      maxlength: [30, 'Максимальная длина имени — 30 символов'],
    },
    about: {
      type: String,
      required: {
        value: true,
        message: 'Поле about является обязательным',
      },
      minlength: [2, 'Минимальная длина — 2 символа'],
      maxlength: [30, 'Максимальная длина — 30 символов'],
    },
    avatar: {
      type: String,
      required: {
        value: true,
        message: 'Поле avatar является обязательным',
      },
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model('user', userSchema);
