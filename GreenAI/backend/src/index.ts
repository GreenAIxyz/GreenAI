import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { setupRoutes } from './routes';
import { setupDatabase } from './database';
import { setupRedis } from './services/redis';
import { logger } from './utils/logger';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Setup routes
setupRoutes(app);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// Initialize services and start server
async function startServer() {
  try {
    // Initialize database connection
    await setupDatabase();
    logger.info('Database connection established');

    // Initialize Redis connection
    await setupRedis();
    logger.info('Redis connection established');

    // Start the server
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 