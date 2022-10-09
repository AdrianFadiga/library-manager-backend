import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userModel: UserModel) {}

  async create(role: string, createUserDto: CreateUserDto) {
    if (role !== 'admin') throw new UnauthorizedException();
    await this.verifyEmailInUse(createUserDto.email);
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userModel.create(createUserDto);
  }

  private async verifyEmailInUse(email: string) {
    const emailInUse = await this.userModel.findByEmail(email);
    if (emailInUse) throw new ConflictException();
  }

  async findOne(id: string) {
    const user = this.userModel.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
