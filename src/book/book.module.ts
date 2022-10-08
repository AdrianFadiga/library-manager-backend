import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookModel } from './book.model';

@Module({
  controllers: [BookController],
  providers: [BookService, BookModel],
  exports: [BookService],
})
export class BookModule {}
