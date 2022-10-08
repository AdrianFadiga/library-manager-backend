import { Category } from '@prisma/client';
import { prisma } from '../prismaClient';

async function main() {
  const options: Category[] = [
    {
      id: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      category: 'Romance',
    },
    {
      id: 'db6c44ae-605f-484b-885c-fa610e6802e',
      category: 'Suspense',
    },
    {
      id: '001d33fb-39af-45fb-847e-a3dbac9054c5',
      category: 'Poesia',
    },
    {
      id: '083f014b-59f4-4057-bc8f-561d89546342',
      category: 'Biografia',
    },
    {
      id: 'a2618872-7105-4250-acc3-9a0c538e2cb3',
      category: 'Comédia',
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
