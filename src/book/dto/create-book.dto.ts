import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsDefined()
  @MaxLength(35)
  @MinLength(5)
  title: string;

  @IsString()
  categoryId: string;
}
