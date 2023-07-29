import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { editUser, getUserInfo } from '../controllers/users';

const router = Router();

router.get('/me', getUserInfo);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email().required(),
    }),
  }),
  editUser,
);

export default router;
