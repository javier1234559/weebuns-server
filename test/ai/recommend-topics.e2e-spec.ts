import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '../../src/app.module';
import { RecommendTopicsDto } from '../../src/models/ai/dto/recommend-topics.dto';
import { TestUser } from '../constraints';

describe('AI Controller - Recommend Topics (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    try {
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: TestUser.email,
          password: TestUser.password,
        });

      if (!loginResponse.body.access_token) {
        throw new Error(
          `Login failed: No access token received ${JSON.stringify(
            loginResponse.body,
          )}`,
        );
      }

      authToken = loginResponse.body.access_token;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  });

  describe('Recommend Topics', () => {
    it('should get topic recommendations', async () => {
      const recommendTopicsDto: RecommendTopicsDto = {
        category: 'technology',
        count: 1,
      };

      const response = await request(app.getHttpServer())
        .get('/ai/recommend-topics')
        .set('Authorization', `Bearer ${authToken}`)
        .query(recommendTopicsDto)
        .expect(HttpStatus.OK);

      expect(response.body).toBeDefined();
      expect(response.body).toEqual({
        topics: expect.arrayContaining([expect.any(String)]),
        category: 'technology',
        count: 1,
      });
      expect(response.body.topics).toHaveLength(1);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
