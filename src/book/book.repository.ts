import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BookRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(createBookDto: CreateBookDto, imageUrl: string) {
    return this.databaseService.book.create({
      data: { ...createBookDto, imageUrl },
    });
  }

  async findAll() {
    return this.databaseService.book.findMany();
  }

  async findOne(id: string) {
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

  async findByCategoryId(categoryId: string) {
    return this.databaseService.book.findMany({
      where: { categoryId },
    });
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
    imageUrl: string | undefined,
  ) {
    return this.databaseService.book.update({
      where: { id },
      data: { ...updateBookDto, updatedAt: new Date(), imageUrl },
    });
  }

  async remove(id: string) {
    return this.databaseService.book.delete({
      where: { id },
    });
  }
}
