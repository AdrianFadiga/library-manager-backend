import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoryRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(category: string) {
    const newCategory = await this.databaseService.category.create({
      data: {
        category,
      },
    });

    return newCategory;
  }

  async findOne(id: string) {
    const category = await this.databaseService.category.findUnique({
      where: { id },
    });

    return category;
  }

  async findAll() {
    const categories = await this.databaseService.category.findMany();

    return categories;
  }

  async findByCategory(category: string) {
    return this.databaseService.category.findFirst({
      where: { category },
    });
  }

  async update(id: string, category: string) {
    const updatedCategory = await this.databaseService.category.update({
      where: { id },
      data: { category },
    });

    return updatedCategory;
  }

  async delete(id: string) {
    return this.databaseService.category.delete({
      where: { id },
    });
  }
}
