import { Prisma } from '@prisma/client';

export const users: Prisma.UserCreateInput[] = [
  {
    id: 1,
    username: 'Alice',
    email: 'alice@prisma.io',
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
    id: 2,
    username: 'Bob',
    email: 'bob@prisma.io',
    role: 'student',
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

export const classes: Prisma.ClassCreateInput[] = [
  {
    name: 'Mathematics',
    description: 'Basic math concepts',
    is_trial: true,
    creator: {
      connect: { id: 1 },
    },
    members: {
      create: [
        {
          user: {
            connect: { id: 1 },
          },
          role: 'teacher',
        },
      ],
    },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Science',
    description: 'Basic science concepts',
    is_trial: false,
    creator: {
      connect: { id: 1 },
    },
    members: {
      create: [
        {
          user: {
            connect: { id: 1 },
          },
          role: 'teacher',
        },
        {
          user: {
            connect: { id: 2 },
          },
          role: 'student',
        },
      ],
    },
    created_at: new Date(),
    updated_at: new Date(),
  },
];
