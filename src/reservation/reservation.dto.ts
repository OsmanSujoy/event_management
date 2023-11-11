import { IsNotEmpty, IsEmail } from 'class-validator';

export interface Reservation {
  id: number;
  name: string;
  email: string;
  workshop_id: number;
}
export class CreateReservation {
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  readonly email: string;
}
