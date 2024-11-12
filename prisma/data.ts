import {
  AuthProvider,
  EssayStatus,
  Language,
  Prisma,
  ProficiencyLevel,
  SpaceTarget,
  UserRole,
} from '@prisma/client';

// Interface for storing generated IDs
interface GeneratedIds {
  users: string[];
  courses: string[];
  userCourses: string[];
  units: string[];
  unitContents: string[];
  notes: string[];
  vocabularies: string[];
  spaces: string[];
  spaceCourses: string[]; // Thêm vào
  essays: string[];
  hashtags: string[];
  essayHashtags: string[];
  corrections: string[];
  correctionSentences: string[];
  correctionReplies: string[];
}

// Store generated IDs
export const generatedIds: GeneratedIds = {
  users: [],
  courses: [],
  userCourses: [],
  units: [],
  unitContents: [],
  notes: [],
  vocabularies: [],
  spaces: [],
  spaceCourses: [], // Thêm vào
  essays: [],
  hashtags: [],
  essayHashtags: [],
  corrections: [],
  correctionSentences: [],
  correctionReplies: [],
};

// Base users data
export const users: Prisma.UserCreateInput[] = [
  {
    username: 'test user',
    email: 'test@gmail.com',
    passwordHash:
      '$2b$10$11zWAeJIiwBV7rI.TYlF4.nW/kLj67MvHs5j8BFcMeG9XgHXx8pci',
    role: UserRole.user,
    authProvider: AuthProvider.local,
    firstName: 'Student',
    lastName: 'One',
    profilePicture: 'https://example.com/student1.jpg',
    isEmailVerified: true,
    currentLevel: ProficiencyLevel.INTERMEDIATE,
    languages: JSON.stringify([
      {
        language: 'en',
        proficiency_level: 'INTERMEDIATE',
        is_native: false,
      },
    ]),
    lastLogin: new Date(),
  },
  {
    username: 'teacher1',
    email: 'teacher@gmail.com',
    passwordHash:
      '$2b$10$11zWAeJIiwBV7rI.TYlF4.nW/kLj67MvHs5j8BFcMeG9XgHXx8pci',
    role: UserRole.teacher,
    authProvider: AuthProvider.local,
    firstName: 'Teacher',
    lastName: 'One',
    profilePicture: 'https://example.com/teacher1.jpg',
    isEmailVerified: true,
    currentLevel: ProficiencyLevel.MASTER,
    languages: JSON.stringify([
      {
        language: 'en',
        proficiency_level: 'NATIVE',
        is_native: true,
      },
    ]),
    lastLogin: new Date(),
  },
  {
    username: 'admin',
    email: 'admin@gmail.com',
    passwordHash:
      '$2b$10$11zWAeJIiwBV7rI.TYlF4.nW/kLj67MvHs5j8BFcMeG9XgHXx8pci',
    role: UserRole.teacher,
    authProvider: AuthProvider.local,
    firstName: 'Teacher',
    lastName: 'One',
    profilePicture: 'https://example.com/teacher1.jpg',
    isEmailVerified: true,
    currentLevel: ProficiencyLevel.MASTER,
    languages: JSON.stringify([
      {
        language: 'en',
        proficiency_level: 'NATIVE',
        is_native: true,
      },
    ]),
    lastLogin: new Date(),
  },
];

export const createCourses = (userIds: string[]) =>
  [
    {
      title: 'English Grammar Fundamentals',
      description: 'Master the basics of English grammar',
      thumbnailUrl: 'https://example.com/course1.jpg',
      level: ProficiencyLevel.INTERMEDIATE,
      price: new Prisma.Decimal(29.99),
      totalWeight: 10,
      isPublished: true,
      creator: {
        connect: { id: userIds[1] },
      },
    },
  ] as Prisma.CourseCreateInput[];

export const createUnits = (courseIds: string[]) =>
  [
    {
      title: 'Present Tenses',
      description: 'Learn all about present tenses in English',
      orderIndex: 1,
      course: {
        connect: { id: courseIds[0] },
      },
    },
  ] as Prisma.UnitCreateInput[];

export const createUnitContents = (unitIds: string[]) =>
  [
    {
      title: 'Present Simple vs Present Continuous',
      contentType: 'theory',
      content: JSON.stringify({
        blocks: [
          {
            type: 'paragraph',
            content:
              'Learn the differences between present simple and present continuous tenses.',
          },
        ],
      }),
      orderIndex: 1,
      isPremium: false,
      isRequired: true,
      completeWeight: 1,
      isDone: false,
      unit: {
        connect: { id: unitIds[0] },
      },
    },
  ] as Prisma.UnitContentCreateInput[];

export const createSpaces = (userIds: string[]) =>
  [
    {
      name: 'English Writing Practice',
      description: 'Space for practicing English writing',
      target: SpaceTarget.GENERAL_LEARNING,
      language: Language.ENGLISH,
      creator: {
        connect: { id: userIds[0] },
      },
    },
  ] as Prisma.SpaceCreateInput[];

export const createSpaceCourses = (spaceIds: string[], courseIds: string[]) =>
  [
    {
      space: {
        connect: { id: spaceIds[0] },
      },
      course: {
        connect: { id: courseIds[0] },
      },
    },
  ] as Prisma.SpaceCourseCreateInput[];

export const createEssays = (spaceIds: string[], userIds: string[]) =>
  [
    {
      title: 'My Journey Learning English',
      summary: 'A personal reflection on learning English',
      content:
        'I have been learning English for three years. It has been an amazing journey with many challenges and rewards.',
      status: EssayStatus.public,
      language: 'ENGLISH',
      upvoteCount: 0,
      space: {
        connect: { id: spaceIds[0] },
      },
      author: {
        connect: { id: userIds[0] },
      },
    },
  ] as Prisma.EssayCreateInput[];

export const hashtags: Prisma.HashtagCreateInput[] = [
  { name: 'learning', usageCount: 0 },
  { name: 'english', usageCount: 0 },
  { name: 'grammar', usageCount: 0 },
];

export const createEssayHashtags = (essayIds: string[], hashtagIds: string[]) =>
  [
    {
      essay: {
        connect: { id: essayIds[0] },
      },
      hashtag: {
        connect: { id: hashtagIds[0] },
      },
    },
  ] as Prisma.EssayHashtagCreateInput[];

export const createVocabularies = (spaceIds: string[], userIds: string[]) =>
  [
    {
      term: 'perseverance',
      meaning: 'Persistence in doing something despite difficulty',
      exampleSentence: 'Her perseverance in studying English paid off.',
      imageUrl: 'https://example.com/vocab1.jpg',
      tags: JSON.stringify(['important', 'academic']),
      repetitionLevel: 0,
      nextReview: new Date(),
      space: {
        connect: { id: spaceIds[0] },
      },
      creator: {
        connect: { id: userIds[0] },
      },
    },
  ] as Prisma.VocabularyCreateInput[];

export const createNotes = (
  unitIds: string[],
  spaceIds: string[],
  userIds: string[],
) =>
  [
    {
      title: 'Present Tense Rules',
      content: 'Important rules about present tense usage...',
      tags: JSON.stringify(['grammar', 'important']),
      isBookmarked: true,
      unit: {
        connect: { id: unitIds[0] },
      },
      space: spaceIds[0]
        ? {
            connect: { id: spaceIds[0] },
          }
        : undefined,
      creator: {
        connect: { id: userIds[0] },
      },
    },
  ] as Prisma.NoteCreateInput[];

export const createCorrections = (essayIds: string[], userIds: string[]) =>
  [
    {
      overallComment: 'Good effort! Here are some suggestions for improvement.',
      rating: 4,
      essay: {
        connect: { id: essayIds[0] },
      },
      creator: {
        connect: { id: userIds[1] },
      },
      sentences: {
        create: [
          {
            originalText: 'I have learn English for three years.',
            correctedText: 'I have been learning English for three years.',
            explanation:
              'Use present perfect continuous for ongoing actions that started in the past.',
            isCorrect: false,
            rating: 4,
            index: 0,
          },
          {
            originalText:
              'It has been an amazing journey with many challenges and rewards.',
            correctedText: null,
            explanation: 'This sentence is perfect!',
            isCorrect: true,
            rating: 5,
            index: 1,
          },
        ],
      },
    },
  ] as Prisma.CorrectionCreateInput[];

export const createCorrectionReplies = (
  correctionIds: string[],
  userIds: string[],
) =>
  [
    {
      comment: 'Thank you for the helpful feedback!',
      correction: {
        connect: { id: correctionIds[0] },
      },
      creator: {
        connect: { id: userIds[0] },
      },
    },
  ] as Prisma.CorrectionReplyCreateInput[];

export const createUserCourses = (userIds: string[], courseIds: string[]) =>
  [
    {
      paymentId: 'payment_123',
      paymentStatus: 'pending',
      purchasePrice: new Prisma.Decimal(29.99),
      user: {
        connect: { id: userIds[0] },
      },
      course: {
        connect: { id: courseIds[0] },
      },
    },
  ] as Prisma.UserCourseCreateInput[];
