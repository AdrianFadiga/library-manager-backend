import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(role: string, createUserDto: CreateUserDto) {
    if (role !== 'admin') throw new UnauthorizedException();
    await this.verifyEmailInUse(createUserDto.email);
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.create(createUserDto);
  }

  private async verifyEmailInUse(email: string) {
    const emailInUse = await this.userRepository.findByEmail(email);
    if (emailInUse) throw new ConflictException();
  }

  async findOne(id: string) {
    const user = this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
