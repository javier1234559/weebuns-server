import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '../../src/app.module';
import { TestUser } from '../constraints';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let currentUser: any;

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

      console.log('Login Response:', loginResponse.body);

      if (!loginResponse.body.access_token) {
        throw new Error(
          `Login failed: No access token received ${JSON.stringify(loginResponse.body)}`,
        );
      }

      authToken = loginResponse.body.access_token;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  });

  it('should get current user and update profile', async () => {
    expect(authToken).toBeDefined();
    console.log('Auth Token:', authToken);

    const meResponse = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    currentUser = meResponse.body.user;

    const updateResponse = await request(app.getHttpServer())
      .patch(`/users/${currentUser.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      })
      .expect(200);

    expect(updateResponse.body.user).toBeDefined();
    expect(updateResponse.body.user.id).toBe(currentUser.id);
    expect(updateResponse.body.user.email).toBe(currentUser.email);
    expect(updateResponse.body.user.firstName).toBe(currentUser.firstName);
    expect(updateResponse.body.user.lastName).toBe(currentUser.lastName);
  });

  afterAll(async () => {
    await app.close();
  });
});
