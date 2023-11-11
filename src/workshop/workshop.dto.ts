import { Reservation } from '../reservation/reservation.dto';

export interface Workshop {
  id: number;
  event_id: number;
  start_at: Date;
  end_at: Date;
  title: string;
  description: string;
}

export interface WorkshopWithReservationCounts extends Workshop {
  total_reservations: number;
}

export interface WorkshopWithReservationList extends Workshop {
  Reservations?: Reservation[];
}
