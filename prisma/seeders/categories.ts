import { Category } from '@prisma/client';
import { prisma } from '../prismaClient';

async function main() {
  const options: Category[] = [
    {
      id: 1,
      category: 'Romance',
    },
    {
      id: 2,
      category: 'Suspense',
    },
    {
      id: 3,
      category: 'Crônica',
    },
    {
      id: 4,
      category: 'Biografia',
    },
    {
      id: 5,
      category: 'Poesia',
    },
  ];

  for (const option of options) {
    await prisma.category.create({
      data: { ...option },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
