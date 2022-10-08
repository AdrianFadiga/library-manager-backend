import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoryModel {
  constructor(private databaseService: DatabaseService) {}

  async create(category: string) {
    return this.databaseService.category.create({
      data: {
        category,
      },
    });
  }

  async findOne(id: string) {
    return this.databaseService.category.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return this.databaseService.category.findMany();
  }

  async findByCategory(category: string) {
    return this.databaseService.category.findFirst({
      where: { category },
    });
  }

  async update(id: string, category: string) {
    return this.databaseService.category.update({
      where: { id },
      data: { category },
    });
  }

  async delete(id: string) {
    return this.databaseService.category.delete({
      where: { id },
    });
  }
}
