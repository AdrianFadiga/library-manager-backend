import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsNumber()
  categoryId: number;
}
