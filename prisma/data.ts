import { AuthProvider, EssayStatus, Prisma, UserRole } from '@prisma/client';

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
  spaceCourses: [],
  essays: [],
  hashtags: [],
  essayHashtags: [],
  corrections: [],
  correctionSentences: [],
  correctionReplies: [],
};

export const REFERENCE_TYPES = {
  LANGUAGE: 'language',
  LEVEL: 'level',
  TARGET: 'target',
  TOPIC: 'topic',
} as const;

export const REFERENCE = {
  LANGUAGES: {
    ENGLISH: 'ENGLISH',
    VIETNAMESE: 'VIETNAMESE',
  },
  LEVELS: {
    BEGINNER: 'BEGINNER',
    ELEMENTARY: 'ELEMENTARY',
    INTERMEDIATE: 'INTERMEDIATE',
    UPPER_INTERMEDIATE: 'UPPER_INTERMEDIATE',
    ADVANCED: 'ADVANCED',
    MASTER: 'MASTER',
  },
  TARGETS: {
    COMMUNICATION: 'COMMUNICATION',
    IELTS: 'IELTS',
    TOEIC: 'TOEIC',
    OTHER: 'OTHER',
  },
  TOPICS: {
    BUSINESS: 'BUSINESS',
    ACADEMIC: 'ACADEMIC',
    TRAVEL: 'TRAVEL',
    DAILY_LIFE: 'DAILY_LIFE',
    TECHNOLOGY: 'TECHNOLOGY',
    OTHER: 'OTHER',
  },
} as const;

export const referenceData: Prisma.ReferenceDataCreateInput[] = [
  // Languages
  {
    type: REFERENCE_TYPES.LANGUAGE,
    code: 'ENGLISH',
    name: 'English',
    metadata: {
      flag: '🇬🇧',
      iso_code: 'en',
      native_name: 'English',
    },
    orderIndex: 1,
  },
  {
    type: REFERENCE_TYPES.LANGUAGE,
    code: 'VIETNAMESE',
    name: 'Vietnamese',
    metadata: {
      flag: '🇻🇳',
      iso_code: 'vi',
      native_name: 'Tiếng Việt',
    },
    orderIndex: 2,
  },

  // Learning Targets
  {
    type: REFERENCE_TYPES.TARGET,
    code: 'COMMUNICATION',
    name: 'Communication',
    metadata: {
      description: 'Focus on speaking and daily communication',
      recommended_level: 'INTERMEDIATE',
    },
    orderIndex: 1,
  },
  {
    type: REFERENCE_TYPES.TARGET,
    code: 'IELTS',
    name: 'IELTS Preparation',
    metadata: {
      description: 'Prepare for IELTS examination',
      recommended_level: 'INTERMEDIATE',
    },
    orderIndex: 2,
  },
  {
    type: REFERENCE_TYPES.TARGET,
    code: 'TOEIC',
    name: 'TOEIC Preparation',
    metadata: {
      description: 'Prepare for TOEIC examination',
      recommended_level: 'INTERMEDIATE',
    },
    orderIndex: 3,
  },
  {
    type: REFERENCE_TYPES.TARGET,
    code: 'OTHER',
    name: 'Other Purposes',
    metadata: {
      description: 'Other learning purposes',
    },
    orderIndex: 4,
  },

  // Topics
  {
    type: REFERENCE_TYPES.TOPIC,
    code: 'BUSINESS',
    name: 'Business',
    metadata: {
      description: 'Business and professional communication',
      sub_topics: ['Marketing', 'Management', 'Finance'],
    },
    orderIndex: 1,
  },
  {
    type: REFERENCE_TYPES.TOPIC,
    code: 'ACADEMIC',
    name: 'Academic',
    metadata: {
      description: 'Academic studies and research',
      sub_topics: ['Research', 'Essay Writing', 'Presentations'],
    },
    orderIndex: 2,
  },
  {
    type: REFERENCE_TYPES.TOPIC,
    code: 'TRAVEL',
    name: 'Travel',
    metadata: {
      description: 'Travel and tourism',
      sub_topics: ['Navigation', 'Culture', 'Food'],
    },
    orderIndex: 3,
  },
  {
    type: REFERENCE_TYPES.TOPIC,
    code: 'DAILY_LIFE',
    name: 'Daily Life',
    metadata: {
      description: 'Everyday conversations and situations',
      sub_topics: ['Shopping', 'Healthcare', 'Entertainment'],
    },
    orderIndex: 4,
  },
  {
    type: REFERENCE_TYPES.TOPIC,
    code: 'TECHNOLOGY',
    name: 'Technology',
    metadata: {
      description: 'Technology and digital communication',
      sub_topics: ['Software', 'Internet', 'Gadgets'],
    },
    orderIndex: 5,
  },
  {
    type: REFERENCE_TYPES.TOPIC,
    code: 'OTHER',
    name: 'Other Topics',
    metadata: {
      description: 'Other topics not listed',
    },
    orderIndex: 6,
  },

  // Proficiency Levels
  {
    type: REFERENCE_TYPES.LEVEL,
    code: 'BEGINNER',
    name: 'Beginner',
    metadata: {
      description: 'Basic understanding of the language',
      cefr_equivalent: 'A1',
      recommended_study_hours: 100,
    },
    orderIndex: 1,
  },
  {
    type: REFERENCE_TYPES.LEVEL,
    code: 'ELEMENTARY',
    name: 'Elementary',
    metadata: {
      description: 'Can handle simple communications',
      cefr_equivalent: 'A2',
      recommended_study_hours: 200,
    },
    orderIndex: 2,
  },
  {
    type: REFERENCE_TYPES.LEVEL,
    code: 'INTERMEDIATE',
    name: 'Intermediate',
    metadata: {
      description: 'Can handle everyday situations',
      cefr_equivalent: 'B1',
      recommended_study_hours: 400,
    },
    orderIndex: 3,
  },
  {
    type: REFERENCE_TYPES.LEVEL,
    code: 'UPPER_INTERMEDIATE',
    name: 'Upper Intermediate',
    metadata: {
      description: 'Can handle complex situations',
      cefr_equivalent: 'B2',
      recommended_study_hours: 600,
    },
    orderIndex: 4,
  },
  {
    type: REFERENCE_TYPES.LEVEL,
    code: 'ADVANCED',
    name: 'Advanced',
    metadata: {
      description: 'Near-native proficiency',
      cefr_equivalent: 'C1',
      recommended_study_hours: 800,
    },
    orderIndex: 5,
  },
  {
    type: REFERENCE_TYPES.LEVEL,
    code: 'MASTER',
    name: 'Master',
    metadata: {
      description: 'Native-like proficiency',
      cefr_equivalent: 'C2',
      recommended_study_hours: 1000,
    },
    orderIndex: 6,
  },
];

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
    lastLogin: new Date(),
    nativeLanguage: 'VIETNAMESE',
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
    nativeLanguage: 'VIETNAMESE',
    lastLogin: new Date(),
  },
  {
    username: 'admin',
    email: 'admin@gmail.com',
    passwordHash:
      '$2b$10$11zWAeJIiwBV7rI.TYlF4.nW/kLj67MvHs5j8BFcMeG9XgHXx8pci',
    role: UserRole.admin,
    authProvider: AuthProvider.local,
    firstName: 'Admin',
    lastName: 'One',
    profilePicture: 'https://example.com/admin1.jpg',
    isEmailVerified: true,
    nativeLanguage: 'VIETNAMESE',
    lastLogin: new Date(),
  },
];

export const createCourses = (userIds: string[]) =>
  [
    {
      title: 'English Grammar Fundamentals',
      description: 'Master the basics of English grammar',
      thumbnailUrl: 'https://example.com/course1.jpg',
      level: 'BEGINNER',
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
      language: 'ENGLISH',
      target: 'COMMUNICATION',
      currentLevel: 'BEGINNER',
      topic: 'ACADEMIC',
      targetLevel: 'INTERMEDIATE',
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
