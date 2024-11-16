import {
  AuthProvider,
  EssayStatus,
  PaymentType,
  Prisma,
  SubscriptionType,
  UserRole,
} from '@prisma/client';

// Interface for storing generated IDs
interface GeneratedIds {
  users: string[];
  courses: string[];
  units: string[];
  unitContents: string[];
  notes: string[];
  vocabularies: string[];
  spaces: string[];
  spaceCourses: string[];
  essays: string[];
  hashtags: string[];
  essayHashtags: string[];
  corrections: string[];
  correctionSentences: string[];
  correctionReplies: string[];
  subscriptions: string[];
  subscriptionPayments: string[];
  correctionCredits: string[];
  courseProgress: string[];
  unitProgress: string[];
  unitContentProgress: string[];
}

// Store generated IDs
export const generatedIds: GeneratedIds = {
  users: [],
  courses: [],
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
  subscriptions: [],
  subscriptionPayments: [],
  correctionCredits: [],
  courseProgress: [],
  unitProgress: [],
  unitContentProgress: [],
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
  // Add all other reference data...
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

// Create subscriptions
export const createSubscriptions = (userIds: string[]) =>
  [
    {
      type: SubscriptionType.BASIC,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      status: 'ACTIVE',
      correctionBalance: 10,
      user: {
        connect: { id: userIds[0] },
      },
    },
    {
      type: SubscriptionType.PREMIUM,
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      status: 'ACTIVE',
      correctionBalance: 50,
      user: {
        connect: { id: userIds[1] },
      },
    },
  ] as Prisma.SubscriptionCreateInput[];

// Create subscription payments
export const createSubscriptionPayments = (subscriptionIds: string[]) =>
  [
    {
      amount: new Prisma.Decimal(29.99),
      paymentType: PaymentType.STRIPE,
      paymentDate: new Date(),
      status: 'SUCCESS',
      subscription: {
        connect: { id: subscriptionIds[0] },
      },
    },
    {
      amount: new Prisma.Decimal(99.99),
      paymentType: PaymentType.STRIPE,
      paymentDate: new Date(),
      status: 'SUCCESS',
      subscription: {
        connect: { id: subscriptionIds[1] },
      },
    },
  ] as Prisma.SubscriptionPaymentCreateInput[];

// Create correction credits
export const createCorrectionCredits = (userIds: string[]) =>
  [
    {
      amount: 10,
      price: new Prisma.Decimal(19.99),
      paymentType: PaymentType.STRIPE,
      expireDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      user: {
        connect: { id: userIds[0] },
      },
    },
  ] as Prisma.CorrectionCreditCreateInput[];

// Create courses
export const createCourses = (userIds: string[]) =>
  [
    {
      title: 'English Grammar Fundamentals',
      description: 'Master the basics of English grammar',
      thumbnailUrl: 'https://example.com/course1.jpg',
      language: 'ENGLISH',
      minLevel: 'BEGINNER',
      maxLevel: 'INTERMEDIATE',
      topics: ['ACADEMIC', 'DAILY_LIFE'],
      courseType: 'COMMUNICATION',
      totalWeight: 10,
      isPublished: true,
      creator: {
        connect: { id: userIds[1] },
      },
    },
    {
      title: 'IELTS Advanced Preparation',
      description: 'Comprehensive IELTS course for high scores',
      thumbnailUrl: 'https://example.com/course2.jpg',
      language: 'ENGLISH',
      minLevel: 'INTERMEDIATE',
      maxLevel: 'ADVANCED',
      topics: ['ACADEMIC', 'BUSINESS'],
      courseType: 'IELTS',
      totalWeight: 20,
      isPublished: true,
      creator: {
        connect: { id: userIds[1] },
      },
    },
  ] as Prisma.CourseCreateInput[];

// Create units
export const createUnits = (courseIds: string[], userIds: string[]) =>
  [
    {
      title: 'Present Tenses',
      description: 'Learn all about present tenses in English',
      orderIndex: 1,
      isPremium: false,
      createdBy: userIds[1], // Teacher ID
      course: {
        connect: { id: courseIds[0] },
      },
    },
    {
      title: 'Past Tenses',
      description: 'Learn all about past tenses in English',
      orderIndex: 2,
      isPremium: true,
      createdBy: userIds[1], // Teacher ID
      course: {
        connect: { id: courseIds[0] },
      },
    },
  ] as Prisma.UnitCreateInput[];

// Create unit contents
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
      unit: {
        connect: { id: unitIds[0] },
      },
    },
  ] as Prisma.UnitContentCreateInput[];

// Create course progress
export const createCourseProgress = (
  userIds: string[],
  courseIds: string[],
  unitIds: string[],
) =>
  [
    {
      completedWeight: 0,
      lastAccessedAt: new Date(),
      user: {
        connect: { id: userIds[0] },
      },
      course: {
        connect: { id: courseIds[0] },
      },
      currentUnit: {
        connect: { id: unitIds[0] },
      },
    },
  ] as Prisma.CourseProgressCreateInput[];

// Create unit progress
export const createUnitProgress = (
  courseProgressIds: string[],
  unitIds: string[],
) =>
  [
    {
      completedWeight: 0,
      lastAccessedAt: new Date(),
      isCompleted: false,
      courseProgress: {
        connect: { id: courseProgressIds[0] },
      },
      unit: {
        connect: { id: unitIds[0] },
      },
    },
  ] as Prisma.UnitProgressCreateInput[];

// Create unit content progress
export const createUnitContentProgress = (
  unitProgressIds: string[],
  unitContentIds: string[],
) =>
  [
    {
      isCompleted: false,
      completedAt: null,
      unitProgress: {
        connect: { id: unitProgressIds[0] },
      },
      unitContent: {
        connect: { id: unitContentIds[0] },
      },
    },
  ] as Prisma.UnitContentProgressCreateInput[];

// Create spaces
export const createSpaces = (userIds: string[]) =>
  [
    {
      name: 'English Writing Practice',
      description: 'Space for practicing English writing',
      language: 'ENGLISH',
      target: 'COMMUNICATION',
      currentLevel: 'BEGINNER',
      topics: ['ACADEMIC', 'BUSINESS'],
      targetLevel: 'INTERMEDIATE',
      creator: {
        connect: { id: userIds[0] },
      },
    },
  ] as Prisma.SpaceCreateInput[];

// Create space courses
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

// Create essays
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

// Create hashtags
export const hashtags: Prisma.HashtagCreateInput[] = [
  { name: 'learning', usageCount: 0 },
  { name: 'english', usageCount: 0 },
  { name: 'grammar', usageCount: 0 },
];

// Create essay hashtags
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
