import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from 'src/book/book.service';
import { CategoryModel } from './category.model';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    private categoryModel: CategoryModel,
    private bookService: BookService,
  ) {}

  async create({ category }: CategoryDto) {
    await this.verifyAlreadyRegistered(category);
    return this.categoryModel.create(category);
  }

  private async verifyAlreadyRegistered(category: string) {
    const alreadyRegistered = await this.categoryModel.findByCategory(category);
    if (alreadyRegistered) {
      throw new ConflictException('Category already registered');
    }
  }

  async findAll() {
    return this.categoryModel.findAll();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findOne(id);
    if (!category) throw new NotFoundException();
    return category;
  }

  async update(id: string, { category }: CategoryDto) {
    const registeredCategory = await this.categoryModel.findOne(id);
    if (!registeredCategory) throw new NotFoundException();
    return this.categoryModel.update(id, category);
  }

  async remove(id: string) {
    const registeredBook = await this.bookService.findByCategoryId(id);
    if (registeredBook)
      throw new ConflictException(
        'There are books registered in this category',
      );
    return this.categoryModel.delete(id);
  }
}
