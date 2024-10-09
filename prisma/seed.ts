import { PrismaClient } from '@prisma/client';

// import { spaces } from './data';

const prisma = new PrismaClient();

// async function seedUser() {
//   for (const user of users) {
//     await prisma.user.create({
//       data: user,
//     });
//   }
// }

// async function seedSpace() {
//   for (const space of spaces) {
//     await prisma.space.create({
//       data: space,
//     });
//   }
// }

async function main() {
  //delete all data , must delete in order reverse of creation due to foreign key constraints
  await prisma.user.deleteMany();

  console.log('Starting seed...');
  //await seedUser();
  // await seedSpace();
  console.log('Seed completed.');
  await prisma.$disconnect();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
