import { IsIn } from 'class-validator';

export class UpdateBookingDto {
  @IsIn(['active', 'finished'])
  status: string;
}
