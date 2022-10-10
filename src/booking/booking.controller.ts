import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorators';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@UseGuards(JwtGuard)
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    const newBooking = await this.bookingService.create(createBookingDto);

    return newBooking;
  }

  @Get('/filter')
  async findAllByStatus(
    @GetUser() { role }: User,
    @Query('status') status: string,
    @Query('bookId') bookId: string,
    @Query('userId') userId: string,
  ) {
    const bookings = await this.bookingService.findAllByStatus(
      role,
      status,
      bookId,
      userId,
    );

    return bookings;
  }

  @Get('/me/filter')
  async getMeByStatus(
    @GetUser() { id }: User,
    @Query('status') status: string,
  ) {
    const myBookings = await this.bookingService.findByUserId(id, status);

    return myBookings;
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @GetUser() { role }: User) {
    const updatedBooking = await this.bookingService.update(id, role);

    return updatedBooking;
  }

  @Get('')
  async findAll(@GetUser() { role }: User) {
    const bookings = await this.bookingService.findAll(role);

    return bookings;
  }
}
