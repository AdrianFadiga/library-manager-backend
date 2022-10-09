import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BookService } from 'src/book/book.service';
import { UserService } from 'src/user/user.service';
import { BookingModel } from './booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    private bookingModel: BookingModel,
    private userService: UserService,
    private bookService: BookService,
  ) {}

  private async verifyBooked(bookId: string) {
    const isBooked = await this.bookingModel.findByBookId(bookId, 'active');
    if (isBooked.length) {
      throw new ConflictException('The book is currently booked');
    }
  }

  async create(createBookingDto: CreateBookingDto) {
    // apenas usuario comum pode ser titular de reserva
    const { userId, bookId } = createBookingDto;
    await this.userService.findOne(userId);
    await this.bookService.findOne(bookId);
    await this.verifyBooked(bookId);
    return this.bookingModel.create(createBookingDto);
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  async findByUserId(id: string, status: string) {
    if (status !== 'active' && status !== 'finished') {
      throw new BadRequestException('Status must be "active" or "finished"');
    }
    await this.userService.findOne(id);
    return this.bookingModel.findByUserId(id, status);
  }

  async update(id: string, role: string) {
    if (role !== 'admin') throw new UnauthorizedException();
    const booking = await this.bookingModel.findOne(id);
    if (!booking) throw new NotFoundException();
    if (booking.status !== 'active') {
      throw new BadRequestException('Booking already finished');
    }
    return this.bookingModel.update(id);
  }
}
