import { User } from '@prisma/client';
import { prisma } from '../prismaClient';

async function main() {
  const users: User[] = [
    {
      id: '5d8dab25-5e03-4c1f-97c8-6ddd82dc8dfe',
      name: 'admin',
      email: 'admin@teste.com',
      password: 'teste',
      role: 'admin',
    },
    {
      id: '1072ac79-16d3-4dcf-8006-1275ea47d38f',
      name: 'usuario',
      email: 'usuario@teste.com',
      password: 'teste',
      role: 'user',
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: { ...user },
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
