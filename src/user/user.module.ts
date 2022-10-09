import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel } from './user.model';

@Module({
  controllers: [UserController],
  providers: [UserService, UserModel],
  exports: [UserService],
})
export class UserModule {}
