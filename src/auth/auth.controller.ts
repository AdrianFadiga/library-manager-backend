import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Get,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtGuard)
  @Get('/me')
  async getMe(@GetUser() user: User) {
    return user;
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }
}
