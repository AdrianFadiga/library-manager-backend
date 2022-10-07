import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthModel {
  constructor(private databaseService: DatabaseService) {}

  async signIn(authDto: AuthDto) {
    const user = await this.databaseService.user.findFirst({
      where: {
        AND: [{ email: authDto.email }, { password: authDto.password }],
      },
    });
    return user;
  }
}
