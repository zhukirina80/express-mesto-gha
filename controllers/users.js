const User = require('../models/User');
const { BAD_REQUEST_ERROR_CODE, NOT_FOUND_ERROR_CODE, INTERNAL_SERVER_ERROR_CODE } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Ошибка на стороне сервера' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new Error('NotFoundError'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Передан некорректный Id' });
      }
      if (err.message === 'NotFoundError') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь по указанному Id не найден' });
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('NotFoundError'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      }
      if (err.message === 'NotFoundError') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь по указанному Id не найден' });
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('NotFoundError'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      }
      if (err.message === 'NotFoundError') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь по указанному Id не найден' });
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
