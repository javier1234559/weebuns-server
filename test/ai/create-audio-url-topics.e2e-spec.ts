import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '../../src/app.module';
import { TextToSpeechDto } from '../../src/models/ai/dto/text-to-speech.dto';
import { TestAdmin } from '../constraints';

describe('Create Audio - Text to Speech (e2e)', () => {
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
          email: TestAdmin.email,
          password: TestAdmin.password,
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

  describe('Text to Speech', () => {
    it('should convert text to speech successfully', async () => {
      const textToSpeechDto: TextToSpeechDto = {
        text: 'Hello',
        voiceId: 'nPczCjzI2devNBz1zQrb',
      };

      const response = await request(app.getHttpServer())
        .post('/ai/tts/convert')
        .set('Authorization', `Bearer ${authToken}`)
        .send(textToSpeechDto)
        .expect(HttpStatus.CREATED);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('audioUrl');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
