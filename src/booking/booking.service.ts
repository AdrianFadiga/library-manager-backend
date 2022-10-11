import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BookRepository } from 'src/book/book.repository';
import { UserRepository } from 'src/user/user.repository';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    private bookingRepository: BookingRepository,
    private userRepository: UserRepository,
    private bookRepository: BookRepository,
  ) {}

  private async verifyBooked(bookId: string) {
    const isBooked = await this.bookingRepository.findByBookId(
      bookId,
      'active',
    );

    if (isBooked.length) {
      throw new ConflictException('The book is currently booked');
    }
  }

  async create(createBookingDto: CreateBookingDto) {
    // apenas usuario comum pode ser titular de reserva
    const { userId, bookId } = createBookingDto;

    const user = await this.userRepository.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    const book = await this.bookRepository.findOne(bookId);
    if (!book) throw new NotFoundException('Book not found');

    await this.verifyBooked(bookId);

    const newBooking = await this.bookingRepository.create(createBookingDto);
    return newBooking;
  }

  async findByQuery(status: string, bookId: string, userId: string) {
    if (status !== 'active' && status !== 'finished') {
      throw new BadRequestException('Status must be "active" or "finished"');
    }
    const bookings = await this.bookingRepository.findByQuery(
      status,
      bookId,
      userId,
    );
    return bookings;
  }

  async findByUserId(id: string, status: string) {
    if (status !== 'active' && status !== 'finished') {
      throw new BadRequestException('Status must be "active" or "finished"');
    }

    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    const booking = await this.bookingRepository.findByUserId(id, status);
    return booking;
  }

  async update(id: string, role: string) {
    if (role !== 'admin') throw new UnauthorizedException();

    const booking = await this.bookingRepository.findOne(id);
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.status === 'finished') {
      throw new BadRequestException('Booking already finished');
    }

    const updatedBooking = await this.bookingRepository.update(id);
    return updatedBooking;
  }

  async findAll(role: string) {
    if (role !== 'admin') throw new UnauthorizedException();
    const bookings = await this.bookingRepository.findAll();

    return bookings;
  }
}
