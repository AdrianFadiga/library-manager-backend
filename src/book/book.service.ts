import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import * as fs from 'fs';
import * as path from 'path';
import { ImgurClient } from 'imgur';
import 'dotenv/config';
import { CategoryRepository } from 'src/category/category.repository';

@Injectable()
export class BookService {
  constructor(
    private bookRepository: BookRepository,
    // Acho que isso aqui não precisa mais
    @Inject(forwardRef(() => CategoryRepository))
    private categoryRepository: CategoryRepository,
  ) {}

  private async verifyTitleInUse(title: string) {
    const alreadyRegistered = await this.findByTitle(title);
    if (alreadyRegistered.length)
      throw new ConflictException('Already registered');
  }

  private async verifyCategoryExists(categoryId: string) {
    const category = await this.categoryRepository.findOne(categoryId);
    if (!category) throw new NotFoundException('Inexistent category');
  }

  async create(
    role: string,
    createBookDto: CreateBookDto,
    file: Express.Multer.File,
  ) {
    if (role !== 'admin') throw new UnauthorizedException();

    const { title, categoryId } = createBookDto;

    await this.verifyTitleInUse(title);
    await this.verifyCategoryExists(categoryId);

    const imageUrl = await this.uploadImage(file);

    const newBook = await this.bookRepository.create(createBookDto, imageUrl);

    return newBook;
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOne(id);
    if (!book) throw new NotFoundException('Book not found');

    return book;
  }

  async findAll() {
    // Paginação
    return this.bookRepository.findAll();
  }

  async findByTitle(title: string) {
    const books = await this.bookRepository.findByTitle(title);
    // if (!books.length) throw new NotFoundException('Book not found');

    return books;
  }

  async findByCategoryId(categoryId: string) {
    await this.verifyCategoryExists(categoryId);

    const books = await this.bookRepository.findByCategoryId(categoryId);
    return books;
  }

  async findByBookingStatus(status: string) {
    if (status !== 'active' && status !== 'finished') {
      throw new BadRequestException('Status must be "active" or "finished"');
    }

    const books = await this.bookRepository.findByBookingStatus(status);

    return books;
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
    role: string,
    file: Express.Multer.File,
  ) {
    if (role !== 'admin') throw new UnauthorizedException();

    const book = await this.findOne(id);
    if (!book) throw new NotFoundException('Book not found');

    const { title, categoryId } = updateBookDto;
    if (title) await this.verifyTitleInUse(title);
    if (categoryId) await this.verifyCategoryExists(categoryId);

    let imageUrl = undefined;
    if (file) imageUrl = await this.uploadImage(file);

    const updatedBook = await this.bookRepository.update(
      id,
      updateBookDto,
      imageUrl,
    );

    return updatedBook;
  }

  async remove(id: string, role: string) {
    if (role !== 'admin') throw new UnauthorizedException();

    const book = await this.findOne(id);
    if (!book) throw new NotFoundException('Book not found');

    return this.bookRepository.remove(id);
  }

  private async uploadImage(file: Express.Multer.File) {
    try {
      const filePath = path.join(
        __dirname,
        '..',
        `../../uploads/${file.filename}`,
      );
      const imgurClient = new ImgurClient({
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        refreshToken: process.env.REFRESHTOKEN,
      });
      const response = await imgurClient.upload({
        image: fs.createReadStream(filePath) as any,
        type: 'stream',
      });
      fs.unlinkSync(filePath);
      return response.data.link;
    } catch (err) {
      throw new BadRequestException('Could not upload');
    }
  }
}
