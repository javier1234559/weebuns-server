import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '../../src/app.module';
import { TestUser } from '../constraints';

describe('Authentication System - Login (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /auth/login', () => {
    it('should login successfully with valid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: TestUser.email,
          password: TestUser.password,
        })
        .expect(HttpStatus.CREATED)
        .expect((response) => {
          expect(response.body).toHaveProperty('access_token');
          expect(response.body).toHaveProperty('user');
          expect(response.body.user).toHaveProperty('email', 'test@gmail.com');
        });
    });

    it('should return 401 when user is not found', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'nonexistent@gmail.com',
          password: '123456',
        })
        .expect(HttpStatus.UNAUTHORIZED)
        .expect((response) => {
          expect(response.body.message).toBeDefined();
          expect(response.body.statusCode).toBe(HttpStatus.UNAUTHORIZED);
        });
    });

    it('should return 401 when password is incorrect', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: TestUser.email,
          password: 'wrongpassword',
        })
        .expect(HttpStatus.UNAUTHORIZED)
        .expect((response) => {
          expect(response.body.message).toBeDefined();
          expect(response.body.statusCode).toBe(HttpStatus.UNAUTHORIZED);
        });
    });
  });

  describe('POST /auth/register', () => {
    // it('should register successfully with valid data', () => {
    //   return request(app.getHttpServer())
    //     .post('/auth/register')
    //     .send({
    //       email: 'newuser@gmail.com',
    //       password: '123456',
    //       firstName: 'New',
    //       lastName: 'User',
    //       username: 'newuser',
    //       nativeLanguage: 'VIETNAMESE',
    //     })
    //     .expect(HttpStatus.CREATED)
    //     .expect((response) => {
    //       expect(response.body).toHaveProperty('access_token');
    //       expect(response.body).toHaveProperty('user');
    //       expect(response.body.user).toHaveProperty(
    //         'email',
    //         'newuser@gmail.com',
    //       );
    //       expect(response.body.user).toHaveProperty('firstName', 'New');
    //       expect(response.body.user).toHaveProperty('lastName', 'User');
    //     });
    // });
  });

  describe('POST /auth/logout', () => {
    it('should logout successfully', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: TestUser.email,
          password: TestUser.password,
        });

      return request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', `Bearer ${loginResponse.body.access_token}`)
        .expect(HttpStatus.CREATED)
        .expect((response) => {
          // Check that cookies are cleared
          expect(response.headers['set-cookie']).toBeDefined();
          expect(response.headers['set-cookie'][0]).toContain('refreshToken=;');
          expect(response.body).toHaveProperty(
            'message',
            'Logged out successfully',
          );
        });
    });
  });
});
