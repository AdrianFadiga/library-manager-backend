import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthModel } from './auth.model';
import { AuthDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(private authModel: AuthModel) {}
  async signIn(authDto: AuthDto) {
    const user = await this.authModel.signIn(authDto);
    if (!user) throw new NotFoundException();
    return user;
  }
}
