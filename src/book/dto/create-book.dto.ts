import { IsDefined, IsString, MaxLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsDefined()
  @MaxLength(100)
  title: string;

  @IsString()
  categoryId: string;
}
