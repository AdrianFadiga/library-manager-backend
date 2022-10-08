import {
  IsDefined,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsDefined()
  @IsString()
  @MaxLength(30)
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MaxLength(30)
  password: string;

  @IsOptional()
  @IsIn(['admin', 'user'])
  role: string;
}
