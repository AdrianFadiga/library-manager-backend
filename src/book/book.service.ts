import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { BookModel } from './book.model';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import * as fs from 'fs';
import * as path from 'path';
import { ImgurClient } from 'imgur';
import 'dotenv/config';

@Injectable()
export class BookService {
  constructor(
    private bookModel: BookModel,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
  ) {}

  async create(
    role: string,
    createBookDto: CreateBookDto,
    file: Express.Multer.File,
  ) {
    if (role !== 'admin') throw new UnauthorizedException();
    await this.verifyTitleInUse(createBookDto.title);
    await this.categoryService.findOne(createBookDto.categoryId);
    const imageUrl = await this.uploadImage(file);
    return this.bookModel.create(createBookDto, imageUrl);
  }

  private async verifyTitleInUse(title: string) {
    const alreadyRegistered = await this.findByTitle(title);
    if (alreadyRegistered.length)
      throw new ConflictException('Already registered');
  }

  async findOne(id: string) {
    const book = await this.bookModel.findOne(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async findAll() {
    // Paginação
    return this.bookModel.findAll();
  }

  async findByTitle(title: string) {
    const book = await this.bookModel.findByTitle(title);
    return book;
  }

  async findByCategoryId(categoryId: string) {
    const book = await this.bookModel.findByCategoryId(categoryId);
    await this.categoryService.findOne(categoryId);
    return book;
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
    role: string,
    file: Express.Multer.File,
  ) {
    if (role !== 'admin') throw new UnauthorizedException();
    await this.findOne(id);
    const { title, categoryId } = updateBookDto;
    if (title) await this.verifyTitleInUse(title);
    if (categoryId) await this.categoryService.findOne(categoryId);
    let imageUrl = undefined;
    if (file) imageUrl = await this.uploadImage(file);
    return this.bookModel.update(id, updateBookDto, imageUrl);
  }

  async remove(id: string, role: string) {
    if (role !== 'admin') throw new UnauthorizedException();
    await this.findOne(id);
    return this.bookModel.remove(id);
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
