import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';

@UseGuards(JwtGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() categoryDto: CategoryDto) {
    const category = await this.categoryService.create(categoryDto);

    return category;
  }

  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return categories;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return category;
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() categoryDto: CategoryDto) {
    const category = await this.categoryService.update(id, categoryDto);
    return category;
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
