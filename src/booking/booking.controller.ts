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
    const createdBooking = await this.bookingService.create(createBookingDto);

    return createdBooking;
  }

  @Get()
  async findAll() {
    const allBookings = await this.bookingService.findAll();

    return allBookings;
  }

  @Get('/me')
  async getMe(@GetUser() { id }: User, @Query('status') status: string) {
    const myBookings = await this.bookingService.findByUserId(id, status);

    return myBookings;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @GetUser() { role }: User) {
    const updatedBooking = await this.bookingService.update(id, role);

    return updatedBooking;
  }
}
