import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    (req as any).userId = (decoded as any).id;
    (req as any).walletAddress = (decoded as any).walletAddress;

    next();
  } catch (error) {
    logger.error('Token verification error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authenticateWallet = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { signature, message, walletAddress } = req.body;

    if (!signature || !message || !walletAddress) {
      return res.status(400).json({
        message: 'Signature, message, and wallet address are required',
      });
    }

    // Here you would verify the signature using Solana web3.js
    // This is a simplified version
    const isValid = true; // Replace with actual signature verification

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid signature' });
    }

    next();
  } catch (error) {
    logger.error('Wallet authentication error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}; 