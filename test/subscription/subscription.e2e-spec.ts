import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '../../src/app.module';
import { CheckPaymentStatusDto } from '../../src/models/subscription/dto/check-payment-status.dto';
import { CreatePaymentDto } from '../../src/models/subscription/dto/create-payment.dto';
import { TestUser } from '../constraints';

describe('Subscription Controller - Payment Flow (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let transactionId: string;

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

  describe('Payment Flow', () => {
    it('should create a payment request', async () => {
      const createPaymentDto: CreatePaymentDto = {
        planType: 'PREMIUM',
        amount: 100000,
        currency: 'VND',
      };

      const response = await request(app.getHttpServer())
        .post('/subscriptions/payment/momo')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createPaymentDto)
        .expect(HttpStatus.CREATED);

      expect(response.body).toBeDefined();
      expect(response.body.paymentUrl).toBeDefined();
      expect(response.body.transactionId).toBeDefined();

      transactionId = response.body.transactionId;
    });

    it('should check payment status', async () => {
      const checkStatusDto: CheckPaymentStatusDto = {
        transactionId: transactionId,
      };

      const response = await request(app.getHttpServer())
        .post('/subscriptions/payment/momo/check-status')
        .send(checkStatusDto)
        .expect(HttpStatus.CREATED);

      expect(response.body).toBeDefined();
      expect(response.body).toEqual(
        expect.objectContaining({
          success: expect.any(Boolean),
          status: expect.any(String),
          message: expect.any(String),
        }),
      );
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
