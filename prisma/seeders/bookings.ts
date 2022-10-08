import { Booking } from '@prisma/client';
import { prisma } from '../prismaClient';

async function main() {
  const options: Booking[] = [
    {
      userId: '1072ac79-16d3-4dcf-8006-1275ea47d38f',
      bookId: 'e243499f-070a-4470-a70d-72fb3ab6b1d5',
      bookingDate: new Date(),
      returnDate: new Date(),
      status: 'Devolvido',
    },
    {
      userId: '5d8dab25-5e03-4c1f-97c8-6ddd82dc8dfe',
      bookId: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      bookingDate: new Date(),
      returnDate: new Date(),
      status: 'Pendente',
    },
  ];

  setTimeout(async () => {
    for (const option of options) {
      await prisma.booking.create({
        data: { ...option },
      });
    }
  }, 1000);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
