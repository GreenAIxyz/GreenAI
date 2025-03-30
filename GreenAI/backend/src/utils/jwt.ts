import jwt from 'jsonwebtoken';
import { env } from './config';
import { logger } from './logger';

interface TokenPayload {
  userId: string;
  walletAddress: string;
}

export class JwtService {
  static generateToken(payload: TokenPayload): string {
    try {
      return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRY,
      });
    } catch (error) {
      logger.error('JWT Generation Error:', error);
      throw error;
    }
  }

  static verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    } catch (error) {
      logger.error('JWT Verification Error:', error);
      throw error;
    }
  }

  static decodeToken(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload;
    } catch (error) {
      logger.error('JWT Decode Error:', error);
      return null;
    }
  }
}

export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
}; 