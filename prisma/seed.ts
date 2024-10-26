// seed.ts
import { PrismaClient } from '@prisma/client';

import {
  createCorrections,
  createEssayHashtags,
  createEssays,
  createFlashCards,
  createFollowers,
  createQuizzes,
  createSpaces,
  createUserLanguages,
  createVocabularies,
  generatedIds,
  hashtags,
  users,
} from './data';

const prisma = new PrismaClient();

async function cleanDatabase() {
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
    console.log({ error });
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

async function seedUserLanguages() {
  console.log('Seeding user languages...');
  const userLanguages = createUserLanguages(generatedIds.users);
  for (const language of userLanguages) {
    await prisma.userLanguage.create({
      data: language,
    });
  }
}

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

async function seedVocabularies() {
  console.log('Seeding vocabularies...');
  const vocabularies = createVocabularies(
    generatedIds.users,
    generatedIds.spaces,
  );
  for (const vocabulary of vocabularies) {
    const createdVocabulary = await prisma.vocabulary.create({
      data: vocabulary,
    });
    generatedIds.vocabularies.push(createdVocabulary.id);
  }
}

async function seedFollowers() {
  console.log('Seeding followers...');
  const followers = createFollowers(generatedIds.users);
  for (const follower of followers) {
    await prisma.follower.create({
      data: follower,
    });
  }
}

async function seedQuizzes() {
  console.log('Seeding quizzes...');
  const quizzes = createQuizzes(generatedIds.users, generatedIds.spaces);
  for (const quiz of quizzes) {
    const createdQuiz = await prisma.quiz.create({
      data: quiz,
    });
    generatedIds.quizzes.push(createdQuiz.id);
  }
}

async function seedCorrections() {
  console.log('Seeding corrections...');
  const corrections = createCorrections(
    generatedIds.users,
    generatedIds.essays,
  );
  for (const correction of corrections) {
    const createdCorrection = await prisma.correction.create({
      data: correction,
    });
    generatedIds.corrections.push(createdCorrection.id);
  }
}

async function seedEssayHashtags() {
  console.log('Seeding essay hashtags...');
  const essayHashtags = createEssayHashtags(
    generatedIds.essays,
    generatedIds.hashtags,
  );
  for (const essayHashtag of essayHashtags) {
    const createdEssayHashtag = await prisma.essayHashtag.create({
      data: essayHashtag,
    });
    generatedIds.essayHashtags.push(createdEssayHashtag.id);
  }
}

async function seedFlashCards() {
  console.log('Seeding flash cards...');
  const flashCards = createFlashCards(
    generatedIds.users,
    generatedIds.vocabularies,
  );
  for (const flashCard of flashCards) {
    await prisma.flashCard.create({
      data: flashCard,
    });
  }
}

async function seedAll() {
  try {
    console.log('Cleaning database...');
    await cleanDatabase();

    // Seed in order of dependencies
    await seedUsers();
    await seedUserLanguages();
    await seedSpaces();
    await seedHashtags();
    await seedEssays();
    await seedEssayHashtags();
    await seedVocabularies();
    await seedFollowers();
    await seedQuizzes();
    await seedCorrections();
    await seedFlashCards();

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

async function main() {
  try {
    await seedAll();
  } catch (error) {
    console.error('Failed to seed database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
