import { Request, Response, NextFunction } from 'express';
import { JwtService, extractTokenFromHeader } from '../utils/jwt';
import { logger } from '../utils/logger';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    walletAddress: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided',
      });
    }

    const decoded = JwtService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Authentication Error:', error);
    return res.status(401).json({
      status: 'error',
      message: 'Invalid or expired token',
    });
  }
};

export const requireWallet = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.walletAddress) {
    return res.status(403).json({
      status: 'error',
      message: 'Wallet connection required',
    });
  }
  next();
}; 