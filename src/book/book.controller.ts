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
    return this.bookService.create(role, createBookDto, file);
  }

  @Get()
  findAll() {
    // Paginação
    return this.bookService.findAll();
  }

  @Get('/filter')
  findOne(
    @Query('title') title: string,
    @Query('categoryId') categoryId: string,
  ) {
    if (title) return this.bookService.findByTitle(title);
    if (categoryId) return this.bookService.findByCategoryId(categoryId);
    throw new BadRequestException('Filter parameter is missing');
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('file'))
  update(
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
    return this.bookService.update(id, updateBookDto, role, file);
  }

  @Delete(':id')
  remove(@GetUser() { role }: User, @Param('id') id: string) {
    return this.bookService.remove(id, role);
  }
}
