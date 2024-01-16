const cardRouter = require('express').Router();
const {
  validationGetRequest,
  validationCreateCard,
  validationCardId,
} = require('../middlewares/validation');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', validationGetRequest, getCards);

cardRouter.delete('/:cardId', validationCardId, deleteCard);

cardRouter.post('/', validationCreateCard, createCard);

cardRouter.put('/:cardId/likes', validationCardId, likeCard);

cardRouter.delete('/:cardId/likes', validationCardId, dislikeCard);

module.exports = {
  cardRouter,
};
