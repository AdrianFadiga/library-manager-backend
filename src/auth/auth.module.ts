import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthModel } from './auth.model';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthModel],
})
export class AuthModule {}
