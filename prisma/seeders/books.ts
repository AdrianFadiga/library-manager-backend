import { Book } from '@prisma/client';
import { prisma } from '../prismaClient';

async function main() {
  const options: Book[] = [
    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'e243499f-070a-4470-a70d-72fb3ab6b1d5',
      title: 'It - A Coisa',
      categoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  setTimeout(async () => {
    for (const option of options) {
      await prisma.book.create({
        data: { ...option },
      });
    }
  }, 500);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
