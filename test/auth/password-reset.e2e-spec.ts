import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '../../src/app.module';
import { MailService } from '../../src/common/mail/mail.service';
import { TestUser } from '../constraints';

describe('Password Reset Flow (e2e)', () => {
  let app: INestApplication;
  let mailService: MailService;
  const testEmail = TestUser.email;
  let resetCode: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MailService)
      .useValue({
        sendPasswordResetEmail: jest.fn().mockImplementation((email, code) => {
          resetCode = code; // Capture the reset code for testing
          return Promise.resolve();
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    mailService = moduleFixture.get<MailService>(MailService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Password Reset Flow', () => {
    it('should request reset code successfully', () => {
      return request(app.getHttpServer())
        .post('/auth/password-reset/request')
        .send({ email: testEmail })
        .expect(HttpStatus.CREATED)
        .expect((response) => {
          expect(response.body).toHaveProperty('message');
          expect(mailService.sendPasswordResetEmail).toHaveBeenCalledWith(
            testEmail,
            expect.any(String),
          );
        });
    });

    it('should fail to request reset code for non-existent email', () => {
      return request(app.getHttpServer())
        .post('/auth/password-reset/request')
        .send({ email: 'nonexistent@gmail.com' })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body).toHaveProperty('message');
          expect(mailService.sendPasswordResetEmail).not.toHaveBeenCalled();
        });
    });

    it('should verify reset code successfully', async () => {
      // First request reset code
      await request(app.getHttpServer())
        .post('/auth/password-reset/request')
        .send({ email: testEmail });

      // Then verify the code
      return request(app.getHttpServer())
        .post('/auth/password-reset/verify')
        .send({
          email: testEmail,
          code: resetCode,
        })
        .expect(HttpStatus.CREATED)
        .expect((response) => {
          expect(response.body).toHaveProperty('message');
          expect(response.body.message).toContain('verified');
        });
    });

    it('should fail to verify invalid reset code', () => {
      return request(app.getHttpServer())
        .post('/auth/password-reset/verify')
        .send({
          email: testEmail,
          code: 'invalid-code',
        })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body).toHaveProperty('message');
        });
    });

    it('should reset password successfully with valid code', async () => {
      // First request reset code
      await request(app.getHttpServer())
        .post('/auth/password-reset/request')
        .send({ email: testEmail });

      // Then reset password
      return request(app.getHttpServer())
        .post('/auth/password-reset/reset')
        .send({
          email: testEmail,
          code: resetCode,
          newPassword: '123456',
        })
        .expect(HttpStatus.CREATED)
        .expect((response) => {
          expect(response.body).toHaveProperty('message');
          expect(response.body.message).toContain('successfully');
        });
    });

    it('should fail to reset password with invalid code', () => {
      return request(app.getHttpServer())
        .post('/auth/password-reset/reset')
        .send({
          email: testEmail,
          code: 'invalid-code',
          newPassword: '123456',
        })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body).toHaveProperty('message');
        });
    });
  });
});
