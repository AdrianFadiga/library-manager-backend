import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(createBookingDto: CreateBookingDto) {
    return this.databaseService.booking.create({
      data: { ...createBookingDto },
    });
  }

  async update(id: string) {
    return this.databaseService.booking.update({
      where: { id },
      data: { status: 'finished', returnDate: new Date() },
    });
  }

  async findOne(id: string) {
    return this.databaseService.booking.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: string, status: string) {
    return this.databaseService.booking.findMany({
      where: {
        AND: [{ userId }, { status }],
      },
    });
  }

  async findByBookId(bookId: string, status: string) {
    // Decidi utilizar findMany pois, caso o status seja 'finished'
    // retornará um array com o histórico de locação do livro;
    return this.databaseService.booking.findMany({
      where: {
        AND: [{ bookId }, { status }],
      },
    });
  }

  async findByStatus(status: string) {
    return this.databaseService.booking.findMany({
      where: { status },
    });
  }
}
