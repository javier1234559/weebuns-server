// import { HttpStatus, INestApplication } from '@nestjs/common';
// import { Test, TestingModule } from '@nestjs/testing';

// import request from 'supertest';

// import { AppModule } from '../../src/app.module';
// import { CreateNoteDto } from '../../src/models/note/dto/create-note.dto';
// import { UpdateNoteDto } from '../../src/models/note/dto/update-note.dto';
// import { TestUser } from '../constraints';

// describe('Note Controller (e2e)', () => {
//   let app: INestApplication;
//   let authToken: string;
//   let createdNoteId: string;
//   let spaceId: string;
//   let courseId: string;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();

//     try {
//       const loginResponse = await request(app.getHttpServer())
//         .post('/auth/login')
//         .send({
//           email: TestUser.email,
//           password: TestUser.password,
//         });

//       if (!loginResponse.body.access_token) {
//         throw new Error(
//           `Login failed: No access token received ${JSON.stringify(
//             loginResponse.body,
//           )}`,
//         );
//       }

//       authToken = loginResponse.body.access_token;

//       // Get space ID first
//       const spacesResponse = await request(app.getHttpServer())
//         .get('/spaces/user')
//         .set('Authorization', `Bearer ${authToken}`)
//         .expect(200);

//       expect(spacesResponse.body.data).toBeDefined();
//       spaceId =
//         spacesResponse.body.data[spacesResponse.body.data.length - 1].id;
//       expect(spaceId).toBeDefined();

//       // Get course ID from the space
//       const coursesResponse = await request(app.getHttpServer())
//         .get(`/spaces/${spaceId}/courses/explore`)
//         .set('Authorization', `Bearer ${authToken}`)
//         .expect(200);

//       expect(coursesResponse.body.data).toBeDefined();
//       courseId =
//         coursesResponse.body.data[coursesResponse.body.data.length - 1].id;
//       expect(courseId).toBeDefined();
//     } catch (error) {
//       console.error('Setup error:', error);
//       throw error;
//     }
//   });

//   describe('Note CRUD Operations', () => {
//     it('should create a new note', async () => {
//       const createNoteDto: CreateNoteDto = {
//         content: 'Test note content',
//         courseId: courseId,
//         spaceId: spaceId,
//         lessonId: '123',
//         title: 'New Note',
//         tags: [],
//       };

//       const response = await request(app.getHttpServer())
//         .post('/notes')
//         .set('Authorization', `Bearer ${authToken}`)
//         .send(createNoteDto)
//         .expect(HttpStatus.CREATED);

//       expect(response.body).toBeDefined();
//       createdNoteId = response.body.id;
//     });

//     it('should create or update a note (upsert)', async () => {
//       const upsertNoteDto: CreateNoteDto = {
//         content: 'Upserted note content',
//         courseId: courseId,
//         spaceId: spaceId,
//         lessonId: '1234',
//         title: 'Updated Note',
//         tags: [],
//       };

//       await request(app.getHttpServer())
//         .post('/notes/upsert')
//         .set('Authorization', `Bearer ${authToken}`)
//         .send(upsertNoteDto)
//         .expect(HttpStatus.CREATED);
//     });

//     it('should get all notes', async () => {
//       const response = await request(app.getHttpServer())
//         .get('/notes')
//         .set('Authorization', `Bearer ${authToken}`)
//         .expect(HttpStatus.OK);

//       expect(response.body.data).toBeDefined();
//       expect(Array.isArray(response.body.data)).toBeTruthy();
//     });

//     it('should get a specific note by id', async () => {
//       await request(app.getHttpServer())
//         .get(`/notes/${createdNoteId}`)
//         .set('Authorization', `Bearer ${authToken}`)
//         .expect(HttpStatus.OK);
//     });

//     it('should update a note', async () => {
//       const updateNoteDto: UpdateNoteDto = {
//         content: 'Updated note content',
//       };

//       await request(app.getHttpServer())
//         .patch(`/notes/${createdNoteId}`)
//         .set('Authorization', `Bearer ${authToken}`)
//         .send(updateNoteDto)
//         .expect(HttpStatus.OK);
//     });

//     it('should delete a note', async () => {
//       await request(app.getHttpServer())
//         .delete(`/notes/${createdNoteId}`)
//         .set('Authorization', `Bearer ${authToken}`)
//         .expect(HttpStatus.OK);

//       // Verify note is deleted
//       await request(app.getHttpServer())
//         .get(`/notes/${createdNoteId}`)
//         .set('Authorization', `Bearer ${authToken}`)
//         .expect(HttpStatus.NOT_FOUND);
//     });
//   });

//   describe('Error Handling', () => {
//     it('should return 401 when not authenticated', async () => {
//       await request(app.getHttpServer())
//         .get('/notes')
//         .expect(HttpStatus.UNAUTHORIZED);
//     });

//     it('should return 404 when getting non-existent note', async () => {
//       await request(app.getHttpServer())
//         .get('/notes/non-existent-id')
//         .set('Authorization', `Bearer ${authToken}`)
//         .expect(HttpStatus.NOT_FOUND);
//     });
//   });

//   afterAll(async () => {
//     await app.close();
//   });
// });
