import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { errors, celebrate, Joi } from 'celebrate';
import router from './routes';
import { login, createUser } from './controllers/users';
import NotFoundError from './errors/not-found-error';
import { requestLogger, errorLogger } from './middlewares/logger';

const { PORT = 3000, DB_URI, ALLOWED_HOSTS } = process.env;

const app = express();

app.use(cors({
  origin: ALLOWED_HOSTS.split(','),
  optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

mongoose.connect(DB_URI);

app.use('/', router);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  createUser,
);

app.use((req, res, next) => {
  next(new NotFoundError('Страницы по запрошенному URL не существует'));
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Server Error' : err.message;
  res.status(statusCode).send({ message });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
