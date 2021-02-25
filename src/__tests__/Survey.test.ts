import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe('Surveys', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it('Should be able to create a new survey', async () => {
        const response = await request(app).post('/surveys')
        .send({
            title: 'Test title',
            description: 'Test description'
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('Should be able to get all surveys', async () => {
        await request(app).post('/surveys')
        .send({
            title: 'Test title 2',
            description: 'Test description 2'
        });

        const response = await request(app).get('/surveys');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
});