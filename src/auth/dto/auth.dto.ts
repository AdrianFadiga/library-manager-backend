import { IsDefined, IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsDefined()
  @MaxLength(30)
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @MaxLength(30)
  @IsNotEmpty()
  password: string;
}
