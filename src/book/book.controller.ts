import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  BadRequestException,
  UploadedFile,
  ParseFilePipeBuilder,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorators';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@UseGuards(JwtGuard)
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(gif|jpe?g|tiff?|png|bmp)$/i })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
    @GetUser()
    { role }: User,
    @Body() createBookDto: CreateBookDto,
  ) {
    const newBook = await this.bookService.create(role, createBookDto, file);

    return newBook;
  }

  @Get()
  async findAll() {
    // Paginação
    const allBooks = await this.bookService.findAll();

    return allBooks;
  }

  @Get('/filter')
  async findByQuery(
    @Query('title') title: string,
    @Query('categoryId') categoryId: string,
    @Query('status') status: string,
  ) {
    if (title) return this.bookService.findByTitle(title);

    if (categoryId) return this.bookService.findByCategoryId(categoryId);

    if (status) return this.bookService.findByBookingStatus(status);

    throw new BadRequestException('Filter parameter is missing');
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(gif|jpe?g|tiff?|png|bmp)$/i })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({
          fileIsRequired: false,
        }),
    )
    file: Express.Multer.File,
    @GetUser() { role }: User,
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const updatedBook = await this.bookService.update(
      id,
      updateBookDto,
      role,
      file,
    );

    return updatedBook;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@GetUser() { role }: User, @Param('id') id: string) {
    await this.bookService.remove(id, role);
  }
}
