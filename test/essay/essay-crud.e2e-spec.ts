import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '../../src/app.module';
import { CreateEssayDto } from '../../src/models/essay/dto/create-essay.dto';
import { UpdateEssayDto } from '../../src/models/essay/dto/update-essay.dto';
import { TestUser } from '../constraints';

describe('Essay Controller (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let createdEssayId: string;
  let spaceId: string;

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

      const spacesResponse = await request(app.getHttpServer())
        .get('/spaces/user')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(spacesResponse.body.data).toBeDefined();

      spaceId =
        spacesResponse.body.data[spacesResponse.body.data.length - 1].id;
      expect(spaceId).toBeDefined();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  });

  describe('Essay CRUD Operations', () => {
    it('should create a new essay', async () => {
      expect(spaceId).toBeDefined();

      const createEssayDto: CreateEssayDto = {
        title: 'Test Essay',
        content: 'This is a test essay content',
        language: 'ENGLISH',
        hashtag_names: ['test', 'essay'],
        status: 'draft',
        spaceId: spaceId,
      };

      const response = await request(app.getHttpServer())
        .post('/essays')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createEssayDto)
        .expect(HttpStatus.CREATED);

      expect(response.body).toBeDefined();
      createdEssayId = response.body.id;
    });

    it('should get all essays', async () => {
      const response = await request(app.getHttpServer())
        .get('/essays')
        .expect(HttpStatus.OK);

      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    it('should get user essays', async () => {
      const response = await request(app.getHttpServer())
        .get('/essays/user')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.OK);

      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    it('should get a specific essay by id', async () => {
      await request(app.getHttpServer())
        .get(`/essays/${createdEssayId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.OK);
    });

    it('should update an essay', async () => {
      const updateEssayDto: UpdateEssayDto = {
        status: 'draft',
      };

      await request(app.getHttpServer())
        .patch(`/essays/${createdEssayId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateEssayDto)
        .expect(HttpStatus.OK);
    });
  });

  describe('Error Handling', () => {
    it('should return 401 when not authenticated for protected routes', async () => {
      await request(app.getHttpServer())
        .get('/essays/user')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should return 404 when getting non-existent essay', async () => {
      await request(app.getHttpServer())
        .get('/essays/non-existent-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
