import { Booking } from '@prisma/client';
import { prisma } from '../prismaClient';

async function main() {
  const options: Booking[] = [
    {
      id: '3cb5b352-35de-48fd-ba4b-fcebd6698b4c',
      userId: '1072ac79-16d3-4dcf-8006-1275ea47d38f',
      bookId: 'e243499f-070a-4470-a70d-72fb3ab6b1d5',
      bookingDate: new Date(),
      returnDate: null,
      status: 'active',
    },
    {
      id: '0eb42728-a9a5-4f8b-9d3c-af8eb553a406',
      userId: '5d8dab25-5e03-4c1f-97c8-6ddd82dc8dfe',
      bookId: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      bookingDate: new Date(),
      returnDate: new Date(),
      status: 'finished',
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
