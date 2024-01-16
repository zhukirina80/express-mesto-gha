const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, '3d7f336481efcd381df00143d14e0dbe');
  } catch (err) {
    if (err.message === 'NotAuthenticate') {
      next(new UnauthorizedError('С токеном что-то не так'));
    } else if (err.name === 'JsonWebTokenError') {
      next(new UnauthorizedError('С токеном что-то не так'));
    } else {
      next(err);
    }
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
