const Card = require('../models/Card');
const { BAD_REQUEST_ERROR_CODE, NOT_FOUND_ERROR_CODE, INTERNAL_SERVER_ERROR_CODE } = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка на стороне сервера' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => new Error('NotFoundError'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные для удаления карточки' });
      }
      if (err.message === 'NotFoundError') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка по указанному Id не найдена' });
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
    });
};

const createCard = (req, res) => {
  const { name } = req.body;
  const { link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('NotFoundError'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки лайка' });
      }
      if (err.message === 'NotFoundError') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Передан несуществующий Id карточки' });
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('NotFoundError'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные для снятия лайка' });
      }
      if (err.message === 'NotFoundError') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Передан несуществующий Id карточки' });
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
