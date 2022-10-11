import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(createBookingDto: CreateBookingDto) {
    const newBooking = await this.databaseService.booking.create({
      data: { ...createBookingDto },
    });

    return newBooking;
  }

  async update(id: string) {
    const updatedBooking = await this.databaseService.booking.update({
      where: { id },
      data: { status: 'finished', returnDate: new Date() },
    });

    return updatedBooking;
  }

  async findOne(id: string) {
    const booking = await this.databaseService.booking.findUnique({
      where: { id },
      include: {
        book: {
          select: {
            title: true,
            id: true,
          },
        },
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return booking;
  }

  async findByUserId(userId: string, status: string) {
    const userBookings = await this.databaseService.booking.findMany({
      where: {
        AND: [{ userId }, { status }],
      },
      include: {
        book: {
          select: {
            title: true,
            id: true,
          },
        },
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return userBookings;
  }

  async findByBookId(bookId: string, status: string) {
    // Decidi utilizar findMany pois, caso o status seja 'finished'
    // retornará um array com o histórico de locação do livro;
    const bookBookings = await this.databaseService.booking.findMany({
      where: {
        AND: [{ bookId }, { status }],
      },
      include: {
        book: {
          select: {
            title: true,
            id: true,
          },
        },
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return bookBookings;
  }

  async findByQuery(status: string, bookId: string, userId: string) {
    const bookings = await this.databaseService.booking.findMany({
      where: {
        AND: [{ status }, { bookId }, { userId }],
      },
      include: {
        book: {
          select: {
            title: true,
            id: true,
          },
        },
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return bookings;
  }

  async findAll() {
    const bookings = await this.databaseService.booking.findMany({
      include: {
        book: {
          select: {
            title: true,
            id: true,
          },
        },
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return bookings;
  }
}
