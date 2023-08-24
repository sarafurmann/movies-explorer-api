import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { getMovies, createMovie, deleteMovie } from '../controllers/movies';
import { URL_REGEX } from '../constants';

const router = Router();

router.get('/', getMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      nameEN: Joi.string().required(),
      nameRU: Joi.string().required(),
      movieId: Joi.number().integer().required(),
      thumbnail: Joi.string().pattern(URL_REGEX).required(),
      trailerLink: Joi.string().pattern(URL_REGEX).required(),
      image: Joi.string().pattern(URL_REGEX).required(),
      description: Joi.string().required(),
      year: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().integer().required(),
      country: Joi.string().required(),
    }),
  }),
  createMovie,
);
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovie,
);

export default router;
