import { Router } from 'express';

import movieRouter from './movies';
import userRouter from './users';

const router = Router();

router.use('/movies', movieRouter);
router.use('/users', userRouter);

export default router;
