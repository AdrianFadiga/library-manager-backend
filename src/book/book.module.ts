import { forwardRef, Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookModel } from './book.model';
import { CategoryModule } from '../category/category.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    forwardRef(() => CategoryModule),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
      }),
    }),
  ],
  controllers: [BookController],
  providers: [BookService, BookModel],
  exports: [BookService],
})
export class BookModule {}
