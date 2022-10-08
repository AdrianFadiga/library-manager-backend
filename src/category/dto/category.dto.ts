import { IsDefined, IsString, MaxLength } from 'class-validator';

export class CategoryDto {
  @IsString()
  @MaxLength(30)
  @IsDefined()
  category: string;
}
