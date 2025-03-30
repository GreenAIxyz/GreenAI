import { Router } from 'express';
import authRoutes from './auth';
import memeRoutes from './memes';
import environmentalActionRoutes from './environmentalActions';
import userRoutes from './users';

const router = Router();

router.use('/auth', authRoutes);
router.use('/memes', memeRoutes);
router.use('/environmental-actions', environmentalActionRoutes);
router.use('/users', userRoutes);

export default router; 