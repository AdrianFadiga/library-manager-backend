import { Book } from '@prisma/client';
import { prisma } from '../prismaClient';

async function main() {
  const options: Book[] = [
    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },
    {
      id: 'e243499f-070a-4470-a70d-72fb3ab6b1d5',
      title: 'It - A Coisa',
      categoryId: 'db6c44ae-605f-484b-885c-fa610e6802e',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/91g9Dvtf+jL.jpg',
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
