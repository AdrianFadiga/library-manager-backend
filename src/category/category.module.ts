import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryModel } from './category.model';
import { BookModule } from '../book/book.module';

@Module({
  imports: [BookModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryModel],
})
export class CategoryModule {}
