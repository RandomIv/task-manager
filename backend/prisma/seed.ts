import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.category.createMany({
    data: [
      { name: 'Work' },
      { name: 'Personal' },
      { name: 'Hobby' },
      { name: 'Shopping' },
    ],
  });

  console.log(`Created ${result.count} categories`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
