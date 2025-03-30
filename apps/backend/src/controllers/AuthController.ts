import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Connection, PublicKey } from '@solana/web3.js';
import { User } from '../entities/User';
import { AppDataSource } from '../database';
import { logger } from '../utils/logger';

export class AuthController {
  private userRepository = AppDataSource.getRepository(User);

  public authenticateWithWallet = async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.body;

      if (!walletAddress) {
        return res.status(400).json({ message: 'Wallet address is required' });
      }

      // Verify the wallet address is valid
      try {
        new PublicKey(walletAddress);
      } catch (error) {
        return res.status(400).json({ message: 'Invalid wallet address' });
      }

      // Find or create user
      let user = await this.userRepository.findOne({ where: { walletAddress } });

      if (!user) {
        user = this.userRepository.create({
          walletAddress,
          balance: 0,
          environmentalScore: 0,
          isVerified: false,
        });
        await this.userRepository.save(user);
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, walletAddress: user.walletAddress },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '24h' }
      );

      return res.json({
        token,
        user,
      });
    } catch (error) {
      logger.error('Authentication error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  public getCurrentUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userRepository.findOne({
        where: { id: (req as any).userId },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json(user);
    } catch (error) {
      logger.error('Get current user error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  public logout = async (_req: Request, res: Response) => {
    try {
      // In a token-based authentication system, we don't need to do anything
      // The client should remove the token
      return res.json({ message: 'Successfully logged out' });
    } catch (error) {
      logger.error('Logout error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
} 