const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: {
        value: true,
        message: 'Поле является обязательным',
      },
      minlength: [2, 'Минимальная длина имени — 2 символа'],
      maxlength: [30, 'Максимальная длина имени — 30 символов'],
    },
    link: {
      type: String,
      validate: {
        // eslint-disable-next-line no-useless-escape
        validator: (v) => validator.isURL(v) && /((http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]))/.test(v),
        message: 'Некорректный URL',
      },
      required: {
        value: true,
        message: 'Поле является обязательным',
      },
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [{
      type: mongoose.Types.ObjectId,
      ref: 'user',
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
