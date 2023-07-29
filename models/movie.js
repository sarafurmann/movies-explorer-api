import mongoose from 'mongoose';
import { URL_REGEX } from '../constants';

const movieSchema = new mongoose.Schema({
  nameEN: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (url) => URL_REGEX.test(url),
      message: 'Требуется ввести URL',
    },
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => URL_REGEX.test(url),
      message: 'Требуется ввести URL',
    },
  },
  image: {
    type: String,
    validate: {
      validator: (url) => URL_REGEX.test(url),
      message: 'Требуется ввести URL',
    },
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

export default mongoose.model('movie', movieSchema);
