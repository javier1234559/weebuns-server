// data.ts
import { AuthProvider, EssayStatus, Prisma, UserRole } from '@prisma/client';

// Interface for storing generated IDs
interface GeneratedIds {
  users: string[];
  spaces: string[];
  essays: string[];
  hashtags: string[];
  vocabularies: string[];
  corrections: string[];
  quizzes: string[];
}

// Store generated IDs
export const generatedIds: GeneratedIds = {
  users: [],
  spaces: [],
  essays: [],
  hashtags: [],
  vocabularies: [],
  corrections: [],
  quizzes: [],
};

// Base entities
export const users: Prisma.UserCreateInput[] = [
  {
    username: 'Alice',
    email: 'test@gmail.com',
    role: UserRole.user,
    auth_provider: AuthProvider.local,
    password_hash:
      '$2b$10$11zWAeJIiwBV7rI.TYlF4.nW/kLj67MvHs5j8BFcMeG9XgHXx8pci',
    auth_provider_id: null,
    first_name: 'Alice',
    last_name: 'Smith',
    profile_picture: 'http://example.com/alice.jpg',
    is_email_verified: false,
    last_login: new Date('2024-01-01T00:00:00Z'),
  },
  {
    username: 'Bob',
    email: 'bob@prisma.io',
    role: UserRole.user,
    auth_provider: AuthProvider.local,
    password_hash:
      '$2b$10$11zWAeJIiwBV7rI.TYlF4.nW/kLj67MvHs5j8BFcMeG9XgHXx8pci',
    auth_provider_id: null,
    first_name: 'Bob',
    last_name: 'Johnson',
    profile_picture: 'http://example.com/bob.jpg',
    is_email_verified: false,
    last_login: new Date('2024-01-01T00:00:00Z'),
  },
];

// Functions to create relational data
export const createSpaces = (userIds: string[]) =>
  [
    {
      name: 'English Learning',
      description: 'Space for learning English',
      essay_number: 0,
      quiz_number: 0,
      vocab_number: 0,
      creator: {
        connect: { id: userIds[0] },
      },
    },
    {
      name: 'Japanese Study',
      description: 'Space for learning Japanese',
      essay_number: 0,
      quiz_number: 0,
      vocab_number: 0,
      creator: {
        connect: { id: userIds[1] },
      },
    },
  ] as Prisma.SpaceCreateInput[];

export const createEssays = (spaceIds: string[], userIds: string[]) =>
  [
    {
      title: 'My First English Essay',
      summary: 'A simple essay about learning English',
      content:
        'This is the content of my first essay about learning English...',
      status: EssayStatus.public,
      language: 'en',
      space: {
        connect: { id: spaceIds[0] },
      },
      author: {
        connect: { id: userIds[0] },
      },
    },
    {
      title: 'Japanese Learning Journey',
      summary: 'My experience learning Japanese',
      content: 'Here is my journey learning Japanese...',
      status: EssayStatus.draft,
      language: 'ja',
      space: {
        connect: { id: spaceIds[1] },
      },
      author: {
        connect: { id: userIds[1] },
      },
    },
  ] as Prisma.EssayCreateInput[];

export const createUserLanguages = (userIds: string[]) =>
  [
    {
      language: 'English',
      proficiency_level: 'Advanced',
      is_native: false,
      user: {
        connect: { id: userIds[0] },
      },
    },
    {
      language: 'Japanese',
      proficiency_level: 'Beginner',
      is_native: false,
      user: {
        connect: { id: userIds[1] },
      },
    },
  ] as Prisma.UserLanguageCreateInput[];

export const hashtags: Prisma.HashtagCreateInput[] = [
  {
    name: 'english',
    usage_count: 1,
  },
  {
    name: 'grammar',
    usage_count: 1,
  },
  {
    name: 'japanese',
    usage_count: 1,
  },
  {
    name: 'learning',
    usage_count: 2,
  },
];

export const createVocabularies = (userIds: string[], spaceIds: string[]) =>
  [
    {
      word: 'ephemeral',
      part_of_speech: 'adjective',
      definition: 'lasting for a very short time',
      pronunciation: 'ih-fem-er-uhl',
      example: 'The beauty of cherry blossoms is ephemeral.',
      mastery_level: 'beginner',
      creator: {
        connect: { id: userIds[0] },
      },
      space: {
        connect: { id: spaceIds[0] },
      },
    },
    {
      word: '桜',
      part_of_speech: 'noun',
      definition: 'cherry blossom',
      pronunciation: 'さくら (sakura)',
      example: '桜が咲いている。(The cherry blossoms are blooming.)',
      mastery_level: 'beginner',
      creator: {
        connect: { id: userIds[1] },
      },
      space: {
        connect: { id: spaceIds[1] },
      },
    },
  ] as Prisma.VocabularyCreateInput[];

export const createFollowers = (userIds: string[]) =>
  [
    {
      follower: {
        connect: { id: userIds[1] }, // Bob follows Alice
      },
      following: {
        connect: { id: userIds[0] },
      },
    },
  ] as Prisma.FollowerCreateInput[];

export const createQuizzes = (userIds: string[], spaceIds: string[]) =>
  [
    {
      title: 'English Grammar Basics',
      space: {
        connect: { id: spaceIds[0] },
      },
      creator: {
        connect: { id: userIds[0] },
      },
      questions: {
        create: [
          {
            question_text: 'What is the past tense of "go"?',
            correct_answer: 'went',
            is_correct: false,
          },
          {
            question_text: 'What is the plural of "child"?',
            correct_answer: 'children',
            is_correct: false,
          },
        ],
      },
    },
  ] as Prisma.QuizCreateInput[];

export const createCorrections = (userIds: string[], essayIds: string[]) =>
  [
    {
      overall_comment: 'Good essay, but needs some grammar improvements',
      rating: 8,
      essay: {
        connect: { id: essayIds[0] },
      },
      creator: {
        connect: { id: userIds[1] },
      },
      sentences: {
        create: [
          {
            original_text: 'I learning English.',
            corrected_text: 'I am learning English.',
            explanation: 'Present continuous tense requires "am/is/are"',
            is_correct: false,
          },
        ],
      },
    },
  ] as Prisma.CorrectionCreateInput[];

export const createFlashCards = (userIds: string[], vocabularyIds: string[]) =>
  [
    {
      familiarity_level: 1,
      review_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      vocabulary: {
        connect: { id: vocabularyIds[0] },
      },
      creator: {
        connect: { id: userIds[0] },
      },
    },
  ] as Prisma.FlashCardCreateInput[];
