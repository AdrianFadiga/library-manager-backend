import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async validatePassword(password: string, passwordHash: string) {
    const isValidPassword = await bcrypt.compare(password, passwordHash);

    if (!isValidPassword) throw new ForbiddenException('Invalid password');
  }

  async findByEmail(email: string) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) throw new NotFoundException('Email not found');
    return user;
  }

  async signIn(authDto: AuthDto) {
    const { email, password } = authDto;

    const user = await this.findByEmail(email);

    await this.validatePassword(password, user.password);

    const { id } = user;
    const payload = { email, sub: id };
    const config = { expiresIn: '7d', secret: this.config.get('JWT_SECRET') };

    const token = this.jwt.sign(payload, config);

    return { access_token: token };
  }
}
