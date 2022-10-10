import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { excludeField } from 'src/utils';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  private async verifyEmailInUse(email: string) {
    const emailInUse = await this.userRepository.findByEmail(email);
    if (emailInUse) throw new ConflictException('Email already registered');
  }

  async create(role: string, createUserDto: CreateUserDto) {
    if (role !== 'admin') throw new UnauthorizedException();

    await this.verifyEmailInUse(createUserDto.email);
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userRepository.create(createUserDto);
    excludeField(newUser, 'password');

    return newUser;
  }

  async findByRole(role: string) {
    const users = await this.userRepository.findByRole(role);
    if (role !== 'admin' && role !== 'user') {
      throw new BadRequestException('Role must be admin or user');
    }

    users.map((user) => excludeField(user, 'password'));

    return users;
  }

  // async findOne(id: string) {
  //   const user = await this.userRepository.findOne(id);
  //   if (!user) throw new NotFoundException('User not found');
  //   excludeField(user, 'password');

  //   return user;
  // }
}
