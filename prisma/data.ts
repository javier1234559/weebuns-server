import { Prisma } from '@prisma/client';

export const users: Prisma.UserCreateInput[] = [
  {
    // id: 1,
    username: 'Alice',
    email: 'test@gmail.com',
    role: 'admin',
    auth_provider: 'local',
    auth_provider_id: null,
    first_name: 'Alice',
    last_name: 'Smith',
    profile_picture: 'http://example.com/alice.jpg',
    is_email_verified: false,
    last_login: new Date('2024-01-01T00:00:00Z'),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    // id: 2,
    username: 'Bob',
    email: 'bob@prisma.io',
    role: 'user',
    auth_provider: 'local',
    auth_provider_id: null,
    first_name: 'Bob',
    last_name: 'Johnson',
    profile_picture: 'http://example.com/bob.jpg',
    is_email_verified: false,
    last_login: new Date('2024-01-01T00:00:00Z'),
    created_at: new Date(),
    updated_at: new Date(),
  },
];

// export const spaces: Prisma.SpaceCreateInput[] = [
//   {
//     // id: 1,
//     name: 'Space 1',
//     description: ' This is space 1',
//     essay_number: 5,
//     quiz_number: 5,
//     vocab_number: 5,
//     created_at: new Date(),
//     updated_at: new Date(),
//     user: {
//       role: 'admin',
//       auth_provider: 'local',
//       auth_provider_id: null,
//       first_name: 'Alice',
//       last_name: 'Smith',
//       profile_picture: 'http://example.com/alice.jpg',
//       is_email_verified: false,
//       last_login: new Date('2024-01-01T00:00:00Z'),
//       created_at: new Date(),
//       updated_at: new Date(),
//     },
//   },
// ];
