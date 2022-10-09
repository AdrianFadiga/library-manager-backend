import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BookRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(createBookDto: CreateBookDto, imageUrl: string) {
    const createdBook = await this.databaseService.book.create({
      data: { ...createBookDto, imageUrl },
    });

    return createdBook;
  }

  async findAll() {
    const allBooks = await this.databaseService.book.findMany();

    return allBooks;
  }

  async findOne(id: string) {
    const book = await this.databaseService.book.findUnique({
      where: {
        id,
      },
    });

    return book;
  }

  async findByTitle(title: string) {
    const books = await this.databaseService.book.findMany({
      where: { title: { contains: title, mode: 'insensitive' } },
    });

    return books;
  }

  async findByCategoryId(categoryId: string) {
    const books = await this.databaseService.book.findMany({
      where: { categoryId },
    });

    return books;
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
    imageUrl: string | undefined,
  ) {
    const updatedBook = await this.databaseService.book.update({
      where: { id },
      data: { ...updateBookDto, updatedAt: new Date(), imageUrl },
    });

    return updatedBook;
  }

  async remove(id: string) {
    return this.databaseService.book.delete({
      where: { id },
    });
  }
}
