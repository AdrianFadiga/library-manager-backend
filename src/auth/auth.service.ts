import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthModel } from './auth.model';
import { AuthDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private authModel: AuthModel,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signIn(authDto: AuthDto) {
    const user = await this.authModel.signIn(authDto);
    if (!user) throw new NotFoundException();
    const { email, id } = user;
    const payload = { email, sub: id };
    const config = { expiresIn: '7d', secret: this.config.get('JWT_SECRET') };

    const token = this.jwt.sign(payload, config);

    return token;
  }
}
