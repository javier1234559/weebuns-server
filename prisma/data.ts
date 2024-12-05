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
      title: 'English for Daily Communication',
      description:
        'Khóa học tiếng Anh giao tiếp thực tế, giúp bạn tự tin nói chuyện trong các tình huống hàng ngày',
      thumbnailUrl:
        'https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png',
      language: REFERENCE.LANGUAGES.ENGLISH,
      minLevel: REFERENCE.LEVELS.BEGINNER,
      maxLevel: REFERENCE.LEVELS.INTERMEDIATE,
      topics: [REFERENCE.TOPICS.DAILY_LIFE, REFERENCE.TOPICS.OTHER],
      courseType: REFERENCE.TARGETS.COMMUNICATION,
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
    title: 'Unit 1: Introductions and Greetings',
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
    title: 'Unit 2: Ordering Food and Drinks',
    orderIndex: 2,
    isPremium: false,
    course: {
      connect: { id: courseIds[0] },
    },
    creator: {
      connect: { id: teacherIds[0] },
    },
  },
  {
    title: 'Unit 3: Shopping and Numbers',
    orderIndex: 3,
    isPremium: true,
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
    title: 'Basic Greetings and Introductions',
    summary: 'Learn common greetings and how to introduce yourself in English',
    content: {
      blocks: [
        {
          id: 'block-greetings-vocab',
          type: 'text',
          order: 0,
          content: {
            html: `
              <h4>Common Greetings and Introductions</h4>
              <ul>
                <li><strong>Hello/Hi</strong>: Xin chào</li>
                <li><strong>Good morning</strong>: Chào buổi sáng</li>
                <li><strong>Good afternoon</strong>: Chào buổi chiều</li>
                <li><strong>Good evening</strong>: Chào buổi tối</li>
                <li><strong>Nice to meet you</strong>: Rất vui được gặp bạn</li>
                <li><strong>My name is...</strong>: Tên tôi là...</li>
                <li><strong>I'm from...</strong>: Tôi đến từ...</li>
                <li><strong>What's your name?</strong>: Bạn tên là gì?</li>
                <li><strong>How are you?</strong>: Bạn khỏe không?</li>
                <li><strong>I'm fine, thank you</strong>: Tôi khỏe, cảm ơn bạn</li>
              </ul>
            `,
          },
        },
        {
          id: 'block-greetings-dictation',
          type: 'dictation',
          order: 1,
          content: {
            text: `<p>Hi, my name is Sarah. I'm from Australia. Nice to meet you! How are you today? I'm fine, thank you. I'm a student at the local university. What about you?</p>`,
            audioUrl: 'https://example.com/audio/basic-introductions.mp3',
          },
        },
        {
          id: 'block-greetings-quiz',
          type: 'quiz',
          order: 2,
          content: {
            title: 'Greetings Practice',
            questions: [
              {
                id: 'q-greetings-1',
                question: "What's the appropriate response to 'How are you?'",
                options: [
                  {
                    id: 'opt-greetings-1',
                    text: 'Nice to meet you',
                    isCorrect: false,
                  },
                  {
                    id: 'opt-greetings-2',
                    text: "I'm fine, thank you",
                    isCorrect: true,
                  },
                ],
                explanation:
                  "When someone asks 'How are you?', the most common response is 'I'm fine, thank you'",
              },
            ],
          },
        },
      ],
      metadata: {
        lastUpdated: new Date().toISOString(),
        updatedById: teacherIds[0],
      },
    },
    orderIndex: 1,
    isPremium: false,
    isRequired: true,
    status: ContentStatus.published,
    lessonWeight: 10,
    unit: {
      connect: { id: unitIds[0] },
    },
    creator: {
      connect: { id: teacherIds[0] },
    },
  },
  {
    title: 'Making Friends and Small Talk',
    summary: 'Learn how to make friends and carry on basic conversations',
    content: {
      blocks: [
        {
          id: 'block-friends-vocab',
          type: 'text',
          order: 0,
          content: {
            html: `
              <h4>Making Friends Vocabulary</h4>
              <ul>
                <li><strong>What do you like to do?</strong>: Bạn thích làm gì?</li>
                <li><strong>Do you want to hang out?</strong>: Bạn có muốn đi chơi không?</li>
                <li><strong>Let's grab a coffee</strong>: Đi uống cà phê nhé</li>
                <li><strong>What are your hobbies?</strong>: Sở thích của bạn là gì?</li>
                <li><strong>We have a lot in common</strong>: Chúng ta có nhiều điểm chung</li>
                <li><strong>Would you like to join us?</strong>: Bạn có muốn tham gia cùng không?</li>
                <li><strong>That sounds fun!</strong>: Nghe vui đấy!</li>
                <li><strong>Maybe another time</strong>: Để lần khác nhé</li>
              </ul>
            `,
          },
        },
        {
          id: 'block-friends-dictation',
          type: 'dictation',
          order: 1,
          content: {
            text: `<p>Hey, would you like to grab a coffee after class? I know a great place nearby. We can talk about our hobbies and get to know each other better. That sounds fun! What time should we meet?</p>`,
            audioUrl: 'https://example.com/audio/making-friends.mp3',
          },
        },
        {
          id: 'block-friends-quiz',
          type: 'quiz',
          order: 2,
          content: {
            title: 'Making Friends Practice',
            questions: [
              {
                id: 'q-friends-1',
                question:
                  'How do you politely invite someone to join an activity?',
                options: [
                  {
                    id: 'opt-friends-1',
                    text: 'You must come with us',
                    isCorrect: false,
                  },
                  {
                    id: 'opt-friends-2',
                    text: 'Would you like to join us?',
                    isCorrect: true,
                  },
                ],
                explanation:
                  "Using 'Would you like...' is a polite way to invite someone",
              },
            ],
          },
        },
      ],
      metadata: {
        lastUpdated: new Date().toISOString(),
        updatedById: teacherIds[0],
      },
    },
    orderIndex: 2,
    isPremium: false,
    isRequired: true,
    status: ContentStatus.published,
    lessonWeight: 10,
    unit: {
      connect: { id: unitIds[0] },
    },
    creator: {
      connect: { id: teacherIds[0] },
    },
  },
  {
    title: 'At the Restaurant',
    summary: 'Learn how to order food and drinks at restaurants',
    content: {
      blocks: [
        {
          id: 'block-restaurant-vocab',
          type: 'text',
          order: 0,
          content: {
            html: `
              <h4>Restaurant Vocabulary</h4>
              <ul>
                <li><strong>Can I see the menu?</strong>: Cho tôi xem thực đơn được không?</li>
                <li><strong>I would like to order...</strong>: Tôi muốn gọi món...</li>
                <li><strong>How spicy is it?</strong>: Món này cay không?</li>
                <li><strong>The bill, please</strong>: Làm ơn tính tiền</li>
                <li><strong>I'm vegetarian</strong>: Tôi ăn chay</li>
                <li><strong>Is this dish gluten-free?</strong>: Món này có gluten không?</li>
                <li><strong>Can I have the check?</strong>: Cho tôi hóa đơn</li>
                <li><strong>Do you accept credit cards?</strong>: Có thanh toán bằng thẻ được không?</li>
              </ul>
            `,
          },
        },
        {
          id: 'block-restaurant-dictation',
          type: 'dictation',
          order: 1,
          content: {
            text: `<p>Waiter: Hi, welcome to our restaurant! What would you like to order? Customer: Can I see the menu, please? I'd like to try your special dish. Also, is it very spicy? Waiter: No, but we can make it spicy if you'd like.</p>`,
            audioUrl: 'https://example.com/audio/restaurant-order.mp3',
          },
        },
        {
          id: 'block-restaurant-quiz',
          type: 'quiz',
          order: 2,
          content: {
            title: 'Restaurant Practice',
            questions: [
              {
                id: 'q-restaurant-1',
                question: 'How do you politely ask for the bill?',
                options: [
                  {
                    id: 'opt-restaurant-1',
                    text: 'Money please',
                    isCorrect: false,
                  },
                  {
                    id: 'opt-restaurant-2',
                    text: 'Can I have the check, please?',
                    isCorrect: true,
                  },
                ],
                explanation:
                  "Using 'Can I have the check, please?' is the polite way to ask for the bill in a restaurant",
              },
            ],
          },
        },
      ],
      metadata: {
        lastUpdated: new Date().toISOString(),
        updatedById: teacherIds[0],
      },
    },
    orderIndex: 1,
    isPremium: false,
    isRequired: true,
    status: ContentStatus.published,
    lessonWeight: 10,
    unit: {
      connect: { id: unitIds[1] },
    },
    creator: {
      connect: { id: teacherIds[0] },
    },
  },
  {
    title: 'Basic Shopping Conversations',
    summary: 'Learn how to shop and discuss prices in English',
    content: {
      blocks: [
        {
          id: 'block-shopping-vocab',
          type: 'text',
          order: 0,
          content: {
            html: `
              <h4>Shopping Vocabulary</h4>
              <ul>
                <li><strong>How much is this?</strong>: Cái này giá bao nhiêu?</li>
                <li><strong>Do you have this in...?</strong>: Bạn có cái này màu/size...?</li>
                <li><strong>It's too expensive</strong>: Nó đắt quá</li>
                <li><strong>Can I try it on?</strong>: Tôi có thể thử không?</li>
                <li><strong>Is it on sale?</strong>: Nó có đang giảm giá không?</li>
                <li><strong>Do you accept returns?</strong>: Có được đổi trả không?</li>
                <li><strong>I'll take it</strong>: Tôi sẽ lấy cái này</li>
                <li><strong>Cash or card?</strong>: Tiền mặt hay thẻ?</li>
              </ul>
            `,
          },
        },
        {
          id: 'block-shopping-dictation',
          type: 'dictation',
          order: 1,
          content: {
            text: `<p>Customer: Excuse me, how much is this shirt? Staff: It's $25, but it's on sale today. You can get 20% off. Customer: Great! Do you have it in medium size? Staff: Let me check for you.</p>`,
            audioUrl: 'https://example.com/audio/shopping.mp3',
          },
        },
        {
          id: 'block-shopping-quiz',
          type: 'quiz',
          order: 2,
          content: {
            title: 'Shopping Practice',
            questions: [
              {
                id: 'q-shopping-1',
                question: 'How do you ask about the price of something?',
                options: [
                  {
                    id: 'opt-shopping-1',
                    text: 'What is the cost?',
                    isCorrect: false,
                  },
                  {
                    id: 'opt-shopping-2',
                    text: 'How much is this?',
                    isCorrect: true,
                  },
                ],
                explanation:
                  "'How much is this?' is the most common and natural way to ask about price",
              },
            ],
          },
        },
      ],
      metadata: {
        lastUpdated: new Date().toISOString(),
        updatedById: teacherIds[0],
      },
    },
    orderIndex: 1,
    isPremium: true,
    isRequired: true,
    status: ContentStatus.published,
    lessonWeight: 10,
    unit: {
      connect: { id: unitIds[2] },
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
    content: 'This lesson is very helpful!',
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
      imageUrl:
        'https://thumbs.dreamstime.com/b/perseverance-symbol-sisyphus-symbol-as-determined-snail-pushing-boulder-up-grass-mountain-as-metaphor-persistence-60384355.jpg',
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
