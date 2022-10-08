import { IsDefined, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsDefined()
  @MaxLength(100)
  title: string;

  @IsNumber()
  categoryId: number;
}
