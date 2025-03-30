import { z } from 'zod';
import { config } from 'dotenv';
import { logger } from './logger';

// Load environment variables
config();

// Define environment variable schema
const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  API_URL: z.string().url(),
  FRONTEND_URL: z.string().url(),

  // Database
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),

  // Authentication
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRY: z.string(),

  // Blockchain
  SOLANA_NETWORK: z.enum(['mainnet-beta', 'testnet', 'devnet']).default('devnet'),
  SOLANA_RPC_URL: z.string().url(),
  PUMP_FUN_API_KEY: z.string(),

  // AI Services
  OPENAI_API_KEY: z.string(),
  STABLE_DIFFUSION_API_KEY: z.string(),

  // Storage
  IPFS_NODE: z.string().url(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
});

// Validate environment variables
const validateEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error('❌ Invalid environment variables:', error.errors);
      process.exit(1);
    }
    throw error;
  }
};

export const env = validateEnv(); 