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
