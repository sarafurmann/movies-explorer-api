import { Router } from 'express';

import auth from '../middlewares/auth';
import movieRouter from './movies';
import userRouter from './users';

const router = Router();

router.use('/movies', auth, movieRouter);
router.use('/users', auth, userRouter);

export default router;
