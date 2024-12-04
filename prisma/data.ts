import {
  AuthProvider,
  ContentStatus,
  PaymentType,
  Prisma,
  SubscriptionType,
  UserRole,
} from '@prisma/client';

// Track generated IDs for relationships
export interface GeneratedIds {
  users: string[];
  courses: string[];
  units: string[];
  lessons: string[];
  spaces: string[];
  spaceCourses: string[];
  essays: string[];
  hashtags: string[];
  essayHashtags: string[];
  corrections: string[];
  correctionSentences: string[];
  correctionReplies: string[];
  notes: string[];
  vocabularies: string[];
  subscriptions: string[];
  subscriptionPayments: string[];
  correctionCredits: string[];
  courseProgress: string[];
  lessonComments: string[];
}

export const generatedIds: GeneratedIds = {
  users: [],
  courses: [],
  units: [],
  lessons: [],
  spaces: [],
  spaceCourses: [],
  essays: [],
  hashtags: [],
  essayHashtags: [],
  corrections: [],
  correctionSentences: [],
  correctionReplies: [],
  notes: [],
  vocabularies: [],
  subscriptions: [],
  subscriptionPayments: [],
  correctionCredits: [],
  courseProgress: [],
  lessonComments: [],
};

// Reference Data Constants
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
];

export const users: Prisma.UserCreateInput[] = [
  {
    username: 'test_user',
    email: 'test@gmail.com',
    passwordHash:
      '$2b$10$11zWAeJIiwBV7rI.TYlF4.nW/kLj67MvHs5j8BFcMeG9XgHXx8pci',
    role: UserRole.user,
    authProvider: AuthProvider.local,
    firstName: 'Student',
    lastName: 'One',
    profilePicture: 'https://example.com/student1.jpg',
    isEmailVerified: true,
    nativeLanguage: 'VIETNAMESE',
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

export const createSubscriptions = (userIds: string[]) =>
  [
    {
      type: SubscriptionType.BASIC,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'ACTIVE',
      correctionBalance: 10,
      user: {
        connect: { id: userIds[0] },
      },
    },
    {
      type: SubscriptionType.PREMIUM,
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      status: 'ACTIVE',
      correctionBalance: 50,
      user: {
        connect: { id: userIds[1] },
      },
    },
  ] as Prisma.SubscriptionCreateInput[];

export const createSubscriptionPayments = (subscriptionIds: string[]) =>
  [
    {
      amount: new Prisma.Decimal(29.99),
      paymentType: PaymentType.momo,
      paymentDate: new Date(),
      status: 'SUCCESS',
      transactionId: '123456789',
      currency: 'DOLLAR',
      subscription: {
        connect: { id: subscriptionIds[0] },
      },
    },
    {
      amount: new Prisma.Decimal(99.99),
      paymentType: PaymentType.zalopay,
      paymentDate: new Date(),
      transactionId: '123456788',
      currency: 'DOLLAR',
      status: 'SUCCESS',
      subscription: {
        connect: { id: subscriptionIds[1] },
      },
    },
  ] as Prisma.SubscriptionPaymentCreateInput[];

export const createCorrectionCredits = (userIds: string[]) =>
  [
    {
      amount: 10,
      price: new Prisma.Decimal(19.99),
      paymentType: PaymentType.momo,
      expireDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      user: {
        connect: { id: userIds[0] },
      },
    },
  ] as Prisma.CorrectionCreditCreateInput[];

export const createCourses = (teacherIds: string[]) =>
  [
    {
      title: 'English Grammar Fundamentals',
      description: 'Master the basics of English grammar',
      thumbnailUrl: 'https://example.com/courses/grammar-basics.jpg',
      language: REFERENCE.LANGUAGES.ENGLISH,
      minLevel: REFERENCE.LEVELS.BEGINNER,
      maxLevel: REFERENCE.LEVELS.INTERMEDIATE,
      topics: [REFERENCE.TOPICS.ACADEMIC, REFERENCE.TOPICS.DAILY_LIFE],
      totalWeight: 24,
      courseType: 'GRAMMAR',
      isPremium: false,
      status: ContentStatus.published,
      creator: {
        connect: { id: teacherIds[0] },
      },
    },
  ] as Prisma.CourseCreateInput[];

export const createUnits = (
  courseIds: string[],
  teacherIds: string[],
): Prisma.UnitCreateInput[] => [
  {
    title: 'Present Tense Mastery',
    orderIndex: 1,
    isPremium: false,
    course: {
      connect: { id: courseIds[0] },
    },
    creator: {
      connect: { id: teacherIds[0] },
    },
  },
  {
    title: 'Past Tense Mastery',
    orderIndex: 2,
    isPremium: false,
    course: {
      connect: { id: courseIds[0] },
    },
    creator: {
      connect: { id: teacherIds[0] },
    },
  },
];

export const createLessons = (
  unitIds: string[],
  teacherIds: string[],
): Prisma.LessonCreateInput[] => [
  {
    title: 'Present Simple - Introduction',
    summary: 'Learn the basics of Present Simple tense',
    content: {
      sections: [
        {
          type: 'text',
          content:
            'The present simple tense is used to describe habits, unchanging situations, general truths, and fixed arrangements.',
        },
        {
          type: 'example',
          content: [
            'I play tennis every Sunday.',
            'The Earth revolves around the Sun.',
            'The train leaves at 8:00 AM every morning.',
          ],
        },
        {
          type: 'exercise',
          questions: [
            {
              type: 'multiple-choice',
              question: 'Which sentence uses Present Simple correctly?',
              options: [
                'He play football.',
                'He plays football.',
                'He playing football.',
              ],
              correctAnswer: 1,
            },
          ],
        },
      ],
    },
    orderIndex: 1,
    isPremium: false,
    isRequired: true,
    lessonWeight: 4,
    status: ContentStatus.published,
    unit: {
      connect: { id: unitIds[0] },
    },
    creator: {
      connect: { id: teacherIds[0] },
    },
  },
  {
    title: 'Present Continuous - Introduction',
    summary: 'Learn the basics of Present Continuous tense',
    content: {
      sections: [
        {
          type: 'text',
          content:
            'The present continuous tense is used to describe temporary or changing situations, and to talk about actions that are happening at the moment of speaking.',
        },
        {
          type: 'example',
          content: [
            'I am studying for a master degree.',
            'The company is building a new factory.',
            'They are planning a trip to Japan.',
          ],
        },
        {
          type: 'exercise',
          questions: [
            {
              type: 'multiple-choice',
              question: 'Which sentence uses Present Continuous correctly?',
              options: [
                'I am play football.',
                'I am playing football.',
                'I playing football.',
              ],
              correctAnswer: 1,
            },
          ],
        },
      ],
    },
    orderIndex: 2,
    isPremium: false,
    isRequired: true,
    lessonWeight: 6,
    status: ContentStatus.published,
    unit: {
      connect: { id: unitIds[0] },
    },
    creator: {
      connect: { id: teacherIds[0] },
    },
  },
  {
    title: 'Past Simple - Introduction',
    summary: 'Learn the basics of Past Simple tense',
    content: {
      sections: [
        {
          type: 'text',
          content:
            'The past simple tense is used to describe completed actions in the past.',
        },
        {
          type: 'example',
          content: [
            'I went to the gym yesterday.',
            'The company was founded in 2010.',
            'They visited Japan last year.',
          ],
        },
        {
          type: 'exercise',
          questions: [
            {
              type: 'multiple-choice',
              question: 'Which sentence uses Past Simple correctly?',
              options: [
                'I went to the gym tomorrow.',
                'I went to the gym yesterday.',
                'I go to the gym yesterday.',
              ],
              correctAnswer: 1,
            },
          ],
        },
      ],
    },
    orderIndex: 1,
    isPremium: false,
    isRequired: true,
    lessonWeight: 4,
    status: ContentStatus.published,
    unit: {
      connect: { id: unitIds[1] },
    },
    creator: {
      connect: { id: teacherIds[0] },
    },
  },
  {
    title: 'Past Continuous - Introduction',
    summary: 'Learn the basics of Past Continuous tense',
    content: {
      sections: [
        {
          type: 'text',
          content:
            'The past continuous tense is used to describe actions that were in progress at a specific point in the past.',
        },
        {
          type: 'example',
          content: [
            'I was studying for a master degree at 8pm last night.',
            'The company was building a new factory in 2010.',
            'They were planning a trip to Japan last year.',
          ],
        },
        {
          type: 'exercise',
          questions: [
            {
              type: 'multiple-choice',
              question: 'Which sentence uses Past Continuous correctly?',
              options: [
                'I was play football at 8pm last night.',
                'I was playing football at 8pm last night.',
                'I playing football at 8pm last night.',
              ],
              correctAnswer: 1,
            },
          ],
        },
      ],
    },
    orderIndex: 2,
    isPremium: false,
    isRequired: true,
    lessonWeight: 6,
    status: ContentStatus.published,
    unit: {
      connect: { id: unitIds[1] },
    },
    creator: {
      connect: { id: teacherIds[0] },
    },
  },
];

export const createLessonComments = (
  lessonIds: string[],
  userIds: string[],
) => [
  {
    content:
      'This lesson was very helpful in understanding present simple tense.',
    lesson: {
      connect: { id: lessonIds[0] },
    },
    creator: {
      connect: { id: userIds[0] },
    },
  },
];

export const createCourseProgress = (
  userIds: string[],
  courseIds: string[],
  unitIds: string[],
  lessonIds: string[], // Changed from unitContentIds
) => [
  {
    user: {
      connect: { id: userIds[0] },
    },
    course: {
      connect: { id: courseIds[0] },
    },
    currentUnit: {
      connect: { id: unitIds[0] },
    },
    currentLesson: {
      // Changed from currentContent
      connect: { id: lessonIds[0] },
    },
    completedWeight: 0,
    completedUnits: [],
    completedLessons: [], // Changed from completedContents
    lastAccessedAt: new Date(),
  },
];

export const createSpaces = (userIds: string[]) =>
  [
    {
      name: 'IELTS Preparation Journey',
      description: 'My personal space for IELTS preparation',
      language: REFERENCE.LANGUAGES.ENGLISH,
      target: REFERENCE.TARGETS.IELTS,
      currentLevel: REFERENCE.LEVELS.INTERMEDIATE,
      targetLevel: REFERENCE.LEVELS.ADVANCED,
      topics: [REFERENCE.TOPICS.ACADEMIC, REFERENCE.TOPICS.BUSINESS],
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
      status: ContentStatus.published,
      language: REFERENCE.LANGUAGES.ENGLISH,
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
  { name: 'technology', usageCount: 0 },
  { name: 'education', usageCount: 0 },
  { name: 'ielts', usageCount: 0 },
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
      meaning: [
        'the quality of continuing to try to achieve a particular aim despite difficulties',
        'sự kiên trì',
      ],
      exampleSentence: 'Her perseverance in studying English paid off.',
      imageUrl: 'https://example.com/images/perseverance.jpg',
      tags: ['important', 'academic'],
      repetitionLevel: 0,
      nextReview: new Date(),
      space: { connect: { id: spaceIds[0] } },
      creator: { connect: { id: userIds[0] } },
    },
    {
      term: 'eloquent',
      meaning: [
        'fluent or persuasive in speaking or writing',
        'hùng biện, lưu loát',
      ],
      exampleSentence: 'She gave an eloquent speech at the conference.',
      imageUrl:
        'https://media.istockphoto.com/id/1995180343/vector/distinguished-orator-delivering-an-eloquent-speech-at-a-podium-a-poised-character-in-a.jpg?s=612x612&w=0&k=20&c=mHENlN8gfsVOnFc_UoogeODTG7Hamwa6J5cymfQtHRc=',
      tags: ['communication', 'academic'],
      repetitionLevel: 0,
      nextReview: new Date(),
      space: { connect: { id: spaceIds[0] } },
      creator: { connect: { id: userIds[0] } },
    },
    {
      term: 'diligent',
      meaning: [
        `having or showing care and conscientiousness in one's work or duties`,
        'chăm chỉ, cần cù',
      ],
      exampleSentence:
        'His diligent study habits resulted in excellent grades.',
      imageUrl:
        'https://www.shutterstock.com/image-vector/vector-illustration-material-business-woman-600nw-1958515078.jpg',
      tags: ['important', 'work'],
      repetitionLevel: 0,
      nextReview: new Date(),
      space: { connect: { id: spaceIds[0] } },
      creator: { connect: { id: userIds[0] } },
    },
  ] as Prisma.VocabularyCreateInput[];

export const createNotes = (
  lessonIds: string[],
  spaceIds: string[],
  userIds: string[],
  courseIds: string[],
  unitIds: string[],
): Prisma.NoteCreateInput[] => [
  {
    title: 'Key Grammar Points - Present Simple',
    content: `1. Use for habits and routines
  2. Use for general truths
  3. Third person singular adds -s
  4. Common time expressions: always, usually, often, sometimes, never`,
    tags: ['grammar', 'present-simple'],
    isBookmarked: true,
    lesson: {
      connect: { id: lessonIds[0] },
    },
    unit: {
      connect: { id: unitIds[0] },
    },
    course: {
      connect: { id: courseIds[0] },
    },
    space: {
      connect: { id: spaceIds[0] },
    },
    creator: {
      connect: { id: userIds[0] },
    },
  },
];

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
