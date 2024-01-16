const userRouter = require('express').Router();
const {
  validationGetRequest,
  validationGetUserById,
  validationUpdateUser,
  validationUpdateAvatar,
} = require('../middlewares/validation');
const {
  getUsers, getUserById, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

userRouter.get('/', validationGetRequest, getUsers);

userRouter.get('/me', validationGetRequest, getUser);

userRouter.get('/:userId', validationGetUserById, getUserById);

userRouter.patch('/me', validationUpdateUser, updateUser);

userRouter.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = {
  userRouter,
};
