import {
  IsDefined,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  name: string;

  @IsDefined()
  @IsString()
  @MaxLength(50)
  @IsEmail()
  @MinLength(5)
  email: string;

  @IsDefined()
  @IsString()
  @MaxLength(20)
  password: string;

  @IsOptional()
  @IsIn(['admin', 'user'])
  role: string;
}
