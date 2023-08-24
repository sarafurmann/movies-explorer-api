import Movie from '../models/movie';
import BadRequestError from '../errors/bad-request-error';
import InternalServerError from '../errors/internal-server-error';
import NotFoundError from '../errors/not-found-error';
import ForbiddenError from '../errors/forbidden-error';

export const getMovies = async (req, res) => {
  const { user: { _id } } = req;
  const movies = await Movie.find({ owner: _id });
  res.send({ data: movies });
};

export const createMovie = async (req, res, next) => {
  try {
    const { user: { _id } } = req;
    const { body } = req;

    const movie = await Movie.create({ ...body, owner: _id });

    res.send({ data: movie });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Bad request error'));
      return;
    }

    next(new InternalServerError('Server error'));
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);

    if (!movie) {
      next(new NotFoundError('Movie is not found'));
      return;
    }

    if (req.user._id !== movie.owner.valueOf()) {
      next(new ForbiddenError('Forbidden error'));
      return;
    }

    await movie.deleteOne();

    res.send({ data: 'Movie is deleted' });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Bad request error'));
      return;
    }

    next(new InternalServerError('Server error'));
  }
};
