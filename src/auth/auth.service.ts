import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthModel } from './auth.model';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private authModel: AuthModel,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signIn(authDto: AuthDto) {
    const user = await this.findByEmail(authDto.email);
    await this.validatePassword(authDto.password, user.password);
    const { email, id } = user;
    const payload = { email, sub: id };
    const config = { expiresIn: '7d', secret: this.config.get('JWT_SECRET') };

    const token = this.jwt.sign(payload, config);

    return { access_token: token };
  }

  async findByEmail(email: string) {
    const user = await this.authModel.findByEmail(email);
    if (!user) throw new NotFoundException('Email not found');
    return user;
  }

  async validatePassword(password: string, passwordHash: string) {
    const isValidPassword = await bcrypt.compare(password, passwordHash);
    if (!isValidPassword) throw new ForbiddenException('Invalid password');
    return;
  }
}
