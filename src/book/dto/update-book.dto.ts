import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @MaxLength(35)
  @MinLength(5)
  @IsOptional()
  title: string;

  @IsOptional()
  @IsString()
  categoryId: string;
}
