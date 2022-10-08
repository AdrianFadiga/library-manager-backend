import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { title } from 'process';
import { BookModel } from './book.model';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private bookModel: BookModel) {}

  async create(role: string, createBookDto: CreateBookDto) {
    if (role !== 'admin') throw new UnauthorizedException();
    // Fiz esta lógica para não permitir que dois livros
    // com o mesmo título sejam cadastrados.
    // Para permitir, basta comentar as duas linhas abaixo
    const alreadyRegistered = await this.findByTitle(title);
    if (alreadyRegistered) throw new ConflictException();
    // Fazer a validação se a categoria é existente
    return this.bookModel.create(createBookDto);
  }

  async findAll() {
    // Paginação
    return this.bookModel.findAll();
  }

  async findByTitle(title: string) {
    const book = await this.bookModel.findByTitle(title);
    if (!book) throw new NotFoundException();
    return book;
  }

  async findByCategoryId(categoryId: number) {
    const book = await this.bookModel.findByCategoryId(categoryId);
    // Validar a categoria
    if (!book.length) throw new NotFoundException();
    return book;
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookModel.update(id, updateBookDto);
  }

  delete(id: string) {
    return this.bookModel.delete(id);
  }
}
