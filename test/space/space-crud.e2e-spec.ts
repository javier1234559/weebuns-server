import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '../../src/app.module';
import { CreateSpaceDto } from '../../src/models/space/dto/create-space.dto';
import { UpdateSpaceDto } from '../../src/models/space/dto/update-space.dto';
import { TestUser } from '../constraints';

describe('SpaceController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let createdSpaceId: string;

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

  describe('CRUD Operations', () => {
    it('should create a new space', async () => {
      const createSpaceDto: CreateSpaceDto = {
        name: 'Test Space',
        description: 'This is a test space',
        language: 'ENGLISH',
        target: 'COMMUNICATION',
        currentLevel: 'BEGINNER',
        targetLevel: 'INTERMEDIATE',
        topics: ['BUSINESS', 'ACADEMIC'],
      };

      const response = await request(app.getHttpServer())
        .post('/spaces')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createSpaceDto)
        .expect(201);

      createdSpaceId = response.body.space.id;
    });

    it('should get all spaces', async () => {
      await request(app.getHttpServer())
        .get('/spaces')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('should get a specific space by id', async () => {
      await request(app.getHttpServer())
        .get(`/spaces/${createdSpaceId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('should update a space', async () => {
      const updateSpaceDto: UpdateSpaceDto = {
        name: 'Updated Test Space',
        description: 'This is an updated test space',
      };

      await request(app.getHttpServer())
        .patch(`/spaces/${createdSpaceId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateSpaceDto)
        .expect(200);
    });

    it('should delete a space', async () => {
      await request(app.getHttpServer())
        .delete(`/spaces/${createdSpaceId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Verify space is deleted
      await request(app.getHttpServer())
        .get(`/spaces/${createdSpaceId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });

  describe('Error Handling', () => {
    it('should return 401 when not authenticated', async () => {
      await request(app.getHttpServer()).get('/spaces').expect(401);
    });

    it('should return 404 when getting non-existent space', async () => {
      await request(app.getHttpServer())
        .get('/spaces/non-existent-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
