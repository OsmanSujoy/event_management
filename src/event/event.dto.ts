import { Workshop } from '../workshop/workshop.dto';

export interface Event {
  id: number;
  title: string;
  start_at: Date;
  end_at: Date;
}

export interface EventWithWorkshopCounts extends Event {
  total_workshops: number;
}

export interface EventWithWorkshopList extends Event {
  workshops?: Workshop[];
}
