import request from 'supertest';
import app from '../server.js';

describe('GET /fact-check', () => {
    it('should return fact check results', async () => {
        const res = await request(app).get('/fact-check?query=climate%20change');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('claims');
    });
});
