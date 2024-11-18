import { PrismaClient } from '@prisma/client';

import {
  createCorrectionCredits,
  createCorrectionReplies,
  createCorrections,
  createCourseProgress,
  createCourses,
  createEssayHashtags,
  createEssays,
  createNotes,
  createSpaceCourses,
  createSpaces,
  createSubscriptionPayments,
  createSubscriptions,
  createUnitContents,
  createUnits,
  createVocabularies,
  generatedIds,
  hashtags,
  referenceData,
  users,
} from './data';

const prisma = new PrismaClient();

async function cleanDatabase() {
  console.log('Cleaning database...');
  const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`);

  try {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE ${tables.join(',')} CASCADE;`,
    );
  } catch (error) {
    console.log('Error cleaning database:', error);
  }
}

// Seed reference data
async function seedReferenceData() {
  console.log('Seeding reference data...');
  for (const ref of referenceData) {
    await prisma.referenceData.create({
      data: ref,
    });
  }
}

async function seedUsers() {
  console.log('Seeding users...');
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user,
    });
    generatedIds.users.push(createdUser.id);
  }
}

async function seedSubscriptions() {
  console.log('Seeding subscriptions...');
  const subscriptions = createSubscriptions(generatedIds.users);
  for (const subscription of subscriptions) {
    const created = await prisma.subscription.create({
      data: subscription,
    });
    generatedIds.subscriptions.push(created.id);
  }
}

async function seedSubscriptionPayments() {
  console.log('Seeding subscription payments...');
  const payments = createSubscriptionPayments(generatedIds.subscriptions);
  for (const payment of payments) {
    const created = await prisma.subscriptionPayment.create({
      data: payment,
    });
    generatedIds.subscriptionPayments.push(created.id);
  }
}

async function seedCorrectionCredits() {
  console.log('Seeding correction credits...');
  const credits = createCorrectionCredits(generatedIds.users);
  for (const credit of credits) {
    const created = await prisma.correctionCredit.create({
      data: credit,
    });
    generatedIds.correctionCredits.push(created.id);
  }
}

async function seedCourses() {
  console.log('Seeding courses...');
  const courses = createCourses(generatedIds.users);
  for (const course of courses) {
    const created = await prisma.course.create({
      data: course,
    });
    generatedIds.courses.push(created.id);
  }
}

async function seedUnits() {
  console.log('Seeding units...');
  const units = createUnits(generatedIds.courses, generatedIds.users);
  for (const unit of units) {
    const created = await prisma.unit.create({
      data: unit,
    });
    generatedIds.units.push(created.id);
  }
}

async function seedUnitContents() {
  console.log('Seeding unit contents...');
  const contents = createUnitContents(generatedIds.units);
  for (const content of contents) {
    const created = await prisma.unitContent.create({
      data: content,
    });
    generatedIds.unitContents.push(created.id);
  }
}

async function seedCourseProgress() {
  console.log('Seeding course progress...');
  const progress = createCourseProgress(
    generatedIds.users,
    generatedIds.courses,
    generatedIds.units,
    generatedIds.unitContents,
  );
  for (const item of progress) {
    const created = await prisma.courseProgress.create({
      data: item,
    });
    generatedIds.courseProgress.push(created.id);
  }
}

async function seedSpaces() {
  console.log('Seeding spaces...');
  const spaces = createSpaces(generatedIds.users);
  for (const space of spaces) {
    const created = await prisma.space.create({
      data: space,
    });
    generatedIds.spaces.push(created.id);
  }
}

async function seedSpaceCourses() {
  console.log('Seeding space courses...');
  const spaceCourses = createSpaceCourses(
    generatedIds.spaces,
    generatedIds.courses,
  );
  for (const spaceCourse of spaceCourses) {
    const created = await prisma.spaceCourse.create({
      data: spaceCourse,
    });
    generatedIds.spaceCourses.push(created.id);
  }
}

async function seedHashtags() {
  console.log('Seeding hashtags...');
  for (const hashtag of hashtags) {
    const created = await prisma.hashtag.create({
      data: hashtag,
    });
    generatedIds.hashtags.push(created.id);
  }
}

async function seedEssays() {
  console.log('Seeding essays...');
  const essays = createEssays(generatedIds.spaces, generatedIds.users);
  for (const essay of essays) {
    const created = await prisma.essay.create({
      data: essay,
    });
    generatedIds.essays.push(created.id);
  }
}

async function seedEssayHashtags() {
  console.log('Seeding essay hashtags...');
  const essayHashtags = createEssayHashtags(
    generatedIds.essays,
    generatedIds.hashtags,
  );
  for (const hashtagLink of essayHashtags) {
    const created = await prisma.essayHashtag.create({
      data: hashtagLink,
    });
    generatedIds.essayHashtags.push(created.id);
  }
}

async function seedVocabularies() {
  console.log('Seeding vocabularies...');
  const vocabularies = createVocabularies(
    generatedIds.spaces,
    generatedIds.users,
  );
  for (const vocabulary of vocabularies) {
    const created = await prisma.vocabulary.create({
      data: vocabulary,
    });
    generatedIds.vocabularies.push(created.id);
  }
}

async function seedNotes() {
  console.log('Seeding notes...');
  const notes = createNotes(
    generatedIds.units,
    generatedIds.spaces,
    generatedIds.users,
  );
  for (const note of notes) {
    const created = await prisma.note.create({
      data: note,
    });
    generatedIds.notes.push(created.id);
  }
}

async function seedCorrections() {
  console.log('Seeding corrections...');
  const corrections = createCorrections(
    generatedIds.essays,
    generatedIds.users,
  );
  for (const correction of corrections) {
    const created = await prisma.correction.create({
      data: correction,
      include: {
        sentences: true,
      },
    });
    generatedIds.corrections.push(created.id);

    if (created.sentences) {
      created.sentences.forEach((sentence) => {
        generatedIds.correctionSentences.push(sentence.id);
      });
    }
  }
}

async function seedCorrectionReplies() {
  console.log('Seeding correction replies...');
  const replies = createCorrectionReplies(
    generatedIds.corrections,
    generatedIds.users,
  );
  for (const reply of replies) {
    const created = await prisma.correctionReply.create({
      data: reply,
    });
    generatedIds.correctionReplies.push(created.id);
  }
}

async function seedAll() {
  try {
    await cleanDatabase();

    // Basic data
    await seedReferenceData();
    await seedUsers();

    // Subscription related
    await seedSubscriptions();
    await seedSubscriptionPayments();
    await seedCorrectionCredits();

    // Course structure
    await seedCourses();
    await seedUnits();
    await seedUnitContents();

    // Progress tracking
    await seedCourseProgress();

    // Space and content
    await seedSpaces();
    await seedSpaceCourses();
    await seedHashtags();
    await seedEssays();
    await seedEssayHashtags();
    await seedVocabularies();
    await seedNotes();

    // Corrections
    await seedCorrections();
    await seedCorrectionReplies();

    console.log('Database seeded successfully');
    console.log('Generated IDs:', generatedIds);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedAll()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
