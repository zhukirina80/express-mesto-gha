const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: {
        value: true,
        message: 'Поле является обязательным',
      },
      minlength: [2, 'Минимальная длина — 2 символа'],
      maxlength: [30, 'Максимальная длина — 30 символов'],
    },
    link: {
      type: String,
      required: {
        value: true,
        message: 'Поле является обязательным',
      },
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    likes: [{
      type: mongoose.Types.ObjectId,
      default: {},
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model('card', cardSchema);
