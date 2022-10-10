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
    const userInfo = user;
    // Deletar o password do usuario
    return userInfo;
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() authDto: AuthDto) {
    const token = this.authService.signIn(authDto);

    return token;
  }
}
