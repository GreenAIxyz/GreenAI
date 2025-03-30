import { Router } from 'express';
import { authenticateWallet, verifyToken } from '../middleware/auth';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

// Wallet authentication
router.post('/wallet', authController.authenticateWithWallet);

// Protected routes
router.get('/me', verifyToken, authController.getCurrentUser);
router.post('/logout', verifyToken, authController.logout);

export default router; 