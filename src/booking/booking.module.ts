import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingModel } from './booking.model';
import { BookModule } from 'src/book/book.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [BookingController],
  providers: [BookingService, BookingModel],
  imports: [BookModule, UserModule],
})
export class BookingModule {}
