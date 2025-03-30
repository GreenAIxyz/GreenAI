import request from 'supertest';
import { app } from '../../apps/backend/src';
import { AppDataSource } from '../../apps/backend/src/database';
import { User } from '../../apps/backend/src/entities/User';
import { EnvironmentalAction } from '../../apps/backend/src/entities/EnvironmentalAction';

describe('API Integration Tests', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(User).clear();
    await AppDataSource.getRepository(EnvironmentalAction).clear();
  });

  describe('Authentication', () => {
    it('should authenticate with wallet address', async () => {
      const res = await request(app)
        .post('/api/v1/auth/wallet')
        .send({ walletAddress: 'testWalletAddress' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      token = res.body.token;
      userId = res.body.user.id;
    });
  });

  describe('Environmental Actions', () => {
    it('should create a new environmental action', async () => {
      const action = {
        type: 'recycling',
        description: 'Recycled 10 plastic bottles',
        impact: 5,
        evidence: 'https://example.com/evidence.jpg',
      };

      const res = await request(app)
        .post('/api/v1/environmental-actions')
        .set('Authorization', `Bearer ${token}`)
        .send(action);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.type).toBe(action.type);
      expect(res.body.userId).toBe(userId);
    });

    it('should get user environmental actions', async () => {
      const res = await request(app)
        .get('/api/v1/environmental-actions')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('Meme Generator', () => {
    it('should generate a new meme', async () => {
      const memeRequest = {
        prompt: 'A funny meme about recycling',
        style: 'funny',
      };

      const res = await request(app)
        .post('/api/v1/memes/generate')
        .set('Authorization', `Bearer ${token}`)
        .send(memeRequest);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('imageUrl');
      expect(res.body).toHaveProperty('text');
    });

    it('should get user memes', async () => {
      const res = await request(app)
        .get('/api/v1/memes')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
}); 