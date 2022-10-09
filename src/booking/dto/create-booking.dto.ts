import { IsDefined, IsIn, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  @IsString()
  @IsDefined()
  userId: string;
  @IsUUID()
  @IsString()
  @IsDefined()
  bookId: string;
  @IsOptional()
  @IsIn(['active', 'finished'])
  status: string;
}
