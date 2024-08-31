import { Prisma, PrismaClient } from '@prisma/client';

import { classes, users } from './data';

const prisma = new PrismaClient();

async function seedUser() {
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

async function seedClass() {
  for (const cls of classes) {
    await prisma.class.create({
      data: cls,
    });
  }
}

async function main() {
  //delete all data , must delete in order reverse of creation due to foreign key constraints
  await prisma.classMember.deleteMany();
  await prisma.class.deleteMany();
  await prisma.user.deleteMany();

  console.log('Starting seed...');
  await seedUser();
  await seedClass();
  console.log('Seed completed.');
  await prisma.$disconnect();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
