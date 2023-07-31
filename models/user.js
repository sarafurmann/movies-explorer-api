import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';
import NotAuthorizedError from '../errors/not-authorized-error';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    return Promise.reject(new NotAuthorizedError('Неправильные почта или пароль'));
  }

  const matched = bcrypt.compare(password, user.password);

  if (!matched) {
    return Promise.reject(new NotAuthorizedError('Неправильные почта или пароль'));
  }

  return user;
};

export default mongoose.model('user', userSchema);
