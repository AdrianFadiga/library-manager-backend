import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookRepository } from 'src/book/book.repository';
import { CategoryRepository } from './category.repository';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    @Inject(forwardRef(() => BookRepository))
    private bookRepository: BookRepository,
  ) {}

  private async verifyAlreadyRegistered(category: string) {
    const alreadyRegistered = await this.categoryRepository.findByCategory(
      category,
    );
    if (alreadyRegistered) {
      throw new ConflictException('Category already registered');
    }
  }

  async create({ category }: CategoryDto) {
    await this.verifyAlreadyRegistered(category);

    const newCategory = await this.categoryRepository.create(category);
    return newCategory;
  }

  async findAll() {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new NotFoundException('Inexistent category');

    return category;
  }

  async update(id: string, { category }: CategoryDto) {
    const registeredCategory = await this.categoryRepository.findOne(id);
    if (!registeredCategory) throw new NotFoundException('Inexistent category');

    const updatedCategory = await this.categoryRepository.update(id, category);
    return updatedCategory;
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new NotFoundException('Inexistent category');

    const registeredBook = await this.bookRepository.findByCategoryId(id);
    if (registeredBook.length >= 1)
      throw new ConflictException(
        'There are books registered in this category',
      );

    return this.categoryRepository.delete(id);
  }
}
