import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '../../src/app.module';
import { TestUser } from '../constraints';

describe('Course Flow (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let lastCourseId: string;
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
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  });

  describe('Course Flow', () => {
    it('should get list of courses and save last course id', async () => {
      const spacesResponse = await request(app.getHttpServer())
        .get('/spaces/user')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(spacesResponse.body.data).toBeDefined();

      spaceId =
        spacesResponse.body.data[spacesResponse.body.data.length - 1].id;
      expect(spaceId).toBeDefined();

      const coursesResponse = await request(app.getHttpServer())
        .get(`/spaces/${spaceId}/courses/explore`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(coursesResponse.body.data).toBeDefined();
      expect(Array.isArray(coursesResponse.body.data)).toBeTruthy();
      expect(coursesResponse.body.data.length).toBeGreaterThan(0);

      lastCourseId =
        coursesResponse.body.data[coursesResponse.body.data.length - 1].id;
      expect(lastCourseId).toBeDefined();
    });

    // it('should join the course', async () => {
    //   await request(app.getHttpServer())
    //     .patch(`/courses/${lastCourseId}/join`)
    //     .set('Authorization', `Bearer ${authToken}`)
    //     .expect(HttpStatus.CREATED);
    // });

    it('should start learning the course', async () => {
      await request(app.getHttpServer())
        .get(`/courses/${lastCourseId}/learn`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.OK);
    });

    it('should get course learning progress', async () => {
      await request(app.getHttpServer())
        .get(`/courses/${lastCourseId}/progress`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });
  });

  describe('Error Handling', () => {
    it('should return 401 when not authenticated', async () => {
      await request(app.getHttpServer()).get('/courses').expect(401);
    });

    it('should return 404 when joining non-existent course', async () => {
      await request(app.getHttpServer())
        .post('/courses/non-existent-id/join')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });

    it('should return 404 when learning non-existent course', async () => {
      await request(app.getHttpServer())
        .post('/courses/non-existent-id/learn')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
