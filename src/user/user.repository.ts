import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UserRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    return this.databaseService.user.create({
      data: { ...createUserDto },
    });
  }

  async findByEmail(email: string) {
    return this.databaseService.user.findFirst({
      where: { email },
    });
  }

  async findOne(id: string) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  async findByRole(role: string) {
    const users = await this.databaseService.user.findMany({
      where: { role },
    });

    return users;
  }

  async findAll() {
    const users = await this.databaseService.user.findMany();

    return users;
  }
}
