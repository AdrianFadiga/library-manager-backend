import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(private userModel: UserModel) {}

  async create(role: string, createUserDto: CreateUserDto) {
    if (role !== 'admin') throw new UnauthorizedException();
    await this.verifyEmailInUse(createUserDto.email);
    return this.userModel.create(createUserDto);
  }

  private async verifyEmailInUse(email: string) {
    const emailInUse = await this.userModel.findByEmail(email);
    if (emailInUse) throw new ConflictException();
    return;
  }
}
