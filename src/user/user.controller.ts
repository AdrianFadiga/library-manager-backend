import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorators';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @GetUser() { role }: User,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.create(role, createUserDto);
  }
}
