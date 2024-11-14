import { PrismaClient } from '@prisma/client';

import {
  createCorrectionReplies,
  createCorrections,
  createCourses,
  createEssayHashtags,
  createEssays,
  createNotes,
  createSpaceCourses,
  createSpaces, // Thêm mới
  createUnitContents,
  createUnits,
  createUserCourses,
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

export async function seedReferenceData() {
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

async function seedUsers() {
  console.log('Seeding users...');
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user,
    });
    generatedIds.users.push(createdUser.id);
  }
}

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

async function seedUnits() {
  console.log('Seeding units...');
  const units = createUnits(generatedIds.courses);
  for (const unit of units) {
    const createdUnit = await prisma.unit.create({
      data: unit,
    });
    generatedIds.units.push(createdUnit.id);
  }
}

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

async function seedSpaces() {
  console.log('Seeding spaces...');
  const spaces = createSpaces(generatedIds.users); // Đã update params
  for (const space of spaces) {
    const createdSpace = await prisma.space.create({
      data: space,
    });
    generatedIds.spaces.push(createdSpace.id);
  }
}

// Thêm mới: seed SpaceCourses
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
    const createdHashtag = await prisma.hashtag.create({
      data: hashtag,
    });
    generatedIds.hashtags.push(createdHashtag.id);
  }
}

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
    generatedIds.spaces, // Thêm spaces ID
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

async function seedUserCourses() {
  console.log('Seeding user courses...');
  const userCourses = createUserCourses(
    generatedIds.users,
    generatedIds.courses,
  );
  for (const userCourse of userCourses) {
    const created = await prisma.userCourse.create({
      data: userCourse,
    });
    generatedIds.userCourses.push(created.id);
  }
}

async function seedAll() {
  try {
    // Clear the database first
    await cleanDatabase();

    // Seed all data in the correct order
    await seedReferenceData();
    await seedUsers();
    await seedCourses();
    await seedUnits();
    await seedUnitContents();
    await seedSpaces();
    await seedSpaceCourses(); // Thêm vào đây
    await seedHashtags();
    await seedEssays();
    await seedEssayHashtags();
    await seedVocabularies();
    await seedNotes();
    await seedCorrections();
    await seedCorrectionReplies();
    await seedUserCourses();

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
