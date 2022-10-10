import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorators';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @GetUser() { role }: User,
    @Body() createUserDto: CreateUserDto,
  ) {
    const newUser = await this.userService.create(role, createUserDto);

    return newUser;
  }

  @Get('/filter')
  async findByRole(@Query('role') role: string) {
    const users = await this.userService.findByRole(role);

    return users;
  }
}
