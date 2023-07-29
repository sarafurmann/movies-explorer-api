import jwt from 'jsonwebtoken';
import NotAuthorizedError from '../errors/not-authorized-error';

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotAuthorizedError('Необходима авторизация'));
    return;
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret');
  } catch (err) {
    next(new NotAuthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
