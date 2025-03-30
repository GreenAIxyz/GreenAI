import request from 'supertest';
import app from './app';

describe('App', () => {
  it('should return 200 OK with message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'GreenAI API' });
  });
}); 