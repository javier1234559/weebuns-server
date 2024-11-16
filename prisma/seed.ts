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
  createUnitContentProgress,
  createUnitContents,
  createUnitProgress,
  createUnits,
  createVocabularies,
  generatedIds,
  hashtags,
  referenceData,
  users,
} from './data';

const prisma = new PrismaClient();

// Clean database
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
  const createdRefs: Record<string, Record<string, string>> = {
    language: {},
    level: {},
    target: {},
    topic: {},
  };

  for (const ref of referenceData) {
    const created = await prisma.referenceData.create({
      data: ref,
    });
    createdRefs[ref.type][ref.code] = created.id;
  }

  return createdRefs;
}

// Seed users
async function seedUsers() {
  console.log('Seeding users...');
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user,
    });
    generatedIds.users.push(createdUser.id);
  }
}

// Seed subscriptions
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

// Seed subscription payments
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

// Seed correction credits
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

// Seed courses
async function seedCourses() {
  console.log('Seeding courses...');
  const courses = createCourses(generatedIds.users);
  for (const course of courses) {
    const createdCourse = await prisma.course.create({
      data: course,
    });
    generatedIds.courses.push(createdCourse.id);
  }
}

// Seed units
async function seedUnits() {
  console.log('Seeding units...');
  const units = createUnits(generatedIds.courses, generatedIds.users);
  for (const unit of units) {
    const createdUnit = await prisma.unit.create({
      data: unit,
    });
    generatedIds.units.push(createdUnit.id);
  }
}

// Seed unit contents
async function seedUnitContents() {
  console.log('Seeding unit contents...');
  const unitContents = createUnitContents(generatedIds.units);
  for (const content of unitContents) {
    const createdContent = await prisma.unitContent.create({
      data: content,
    });
    generatedIds.unitContents.push(createdContent.id);
  }
}

// Seed course progress
async function seedCourseProgress() {
  console.log('Seeding course progress...');
  const progress = createCourseProgress(
    generatedIds.users,
    generatedIds.courses,
    generatedIds.units,
  );
  for (const item of progress) {
    const created = await prisma.courseProgress.create({
      data: item,
    });
    generatedIds.courseProgress.push(created.id);
  }
}

// Seed unit progress
async function seedUnitProgress() {
  console.log('Seeding unit progress...');
  const progress = createUnitProgress(
    generatedIds.courseProgress,
    generatedIds.units,
  );
  for (const item of progress) {
    const created = await prisma.unitProgress.create({
      data: item,
    });
    generatedIds.unitProgress.push(created.id);
  }
}

// Seed unit content progress
async function seedUnitContentProgress() {
  console.log('Seeding unit content progress...');
  const progress = createUnitContentProgress(
    generatedIds.unitProgress,
    generatedIds.unitContents,
  );
  for (const item of progress) {
    const created = await prisma.unitContentProgress.create({
      data: item,
    });
    generatedIds.unitContentProgress.push(created.id);
  }
}

// Seed spaces
async function seedSpaces() {
  console.log('Seeding spaces...');
  const spaces = createSpaces(generatedIds.users);
  for (const space of spaces) {
    const createdSpace = await prisma.space.create({
      data: space,
    });
    generatedIds.spaces.push(createdSpace.id);
  }
}

// Seed space courses
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

// Seed hashtags
async function seedHashtags() {
  console.log('Seeding hashtags...');
  for (const hashtag of hashtags) {
    const createdHashtag = await prisma.hashtag.create({
      data: hashtag,
    });
    generatedIds.hashtags.push(createdHashtag.id);
  }
}

// Seed essays
async function seedEssays() {
  console.log('Seeding essays...');
  const essays = createEssays(generatedIds.spaces, generatedIds.users);
  for (const essay of essays) {
    const createdEssay = await prisma.essay.create({
      data: essay,
    });
    generatedIds.essays.push(createdEssay.id);
  }
}

// Seed essay hashtags
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

// Seed vocabularies
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

// Seed notes
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

// Seed corrections
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
  }
}

// Seed correction replies
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

// Main seeding function
async function seedAll() {
  try {
    // Clean the database first
    await cleanDatabase();

    // Seed basic data
    await seedReferenceData();
    await seedUsers();

    // Seed subscription-related data
    await seedSubscriptions();
    await seedSubscriptionPayments();
    await seedCorrectionCredits();

    // Seed course structure
    await seedCourses();
    await seedUnits();
    await seedUnitContents();

    // Seed progress tracking
    await seedCourseProgress();
    await seedUnitProgress();
    await seedUnitContentProgress();

    // Seed space and content
    await seedSpaces();
    await seedSpaceCourses();
    await seedHashtags();
    await seedEssays();
    await seedEssayHashtags();
    await seedVocabularies();
    await seedNotes();
    await seedCorrections();
    await seedCorrectionReplies();

    console.log('Database has been seeded successfully');
    console.log('Generated IDs:', generatedIds);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedAll()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
