import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryModel } from './category.model';
import { BookModule } from '../book/book.module';

@Module({
  imports: [forwardRef(() => BookModule)],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryModel],
  exports: [CategoryService],
})
export class CategoryModule {}
