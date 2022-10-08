import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BookModel {
  constructor(private databaseService: DatabaseService) {}

  async create(createBookDto: CreateBookDto) {
    return this.databaseService.book.create({
      data: { ...createBookDto },
    });
  }

  async findAll() {
    return this.databaseService.book.findMany();
  }

  async findById(id: string) {
    return this.databaseService.book.findUnique({
      where: {
        id,
      },
    });
  }

  async findByTitle(title: string) {
    return this.databaseService.book.findMany({
      where: { title: { contains: title, mode: 'insensitive' } },
    });
  }

  async findByCategoryId(categoryId: number) {
    return this.databaseService.book.findMany({
      where: { categoryId },
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return this.databaseService.book.update({
      where: { id },
      data: { ...updateBookDto, updatedAt: new Date() },
    });
  }

  async delete(id: string) {
    return this.databaseService.book.delete({
      where: { id },
    });
  }
}
