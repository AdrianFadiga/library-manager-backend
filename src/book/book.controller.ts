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
} from '@nestjs/common';
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
  async create(
    @GetUser() { role }: User,
    @Body() createBookDto: CreateBookDto,
  ) {
    return this.bookService.create(role, createBookDto);
  }

  @Get()
  findAll() {
    // Paginação
    return this.bookService.findAll();
  }

  @Get('/filter')
  findOne(
    @Query('categoryId') categoryId: string,
    @Query('title') title: string,
  ) {
    if (title) return this.bookService.findByTitle(title);
    return this.bookService.findByCategoryId(+categoryId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    // return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.bookService.remove(+id);
  }
}
