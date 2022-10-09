import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(createBookingDto: CreateBookingDto) {
    const createdBooking = await this.databaseService.booking.create({
      data: { ...createBookingDto },
    });

    return createdBooking;
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
    });

    return booking;
  }

  async findByUserId(userId: string, status: string) {
    const userBookings = await this.databaseService.booking.findMany({
      where: {
        AND: [{ userId }, { status }],
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
    });
    return bookBookings;
  }

  async findByStatus(status: string) {
    const bookings = await this.databaseService.booking.findMany({
      where: { status },
    });

    return bookings;
  }
}
