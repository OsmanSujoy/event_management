import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Event,
  EventWithWorkshopCounts,
  EventWithWorkshopList,
} from './event.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import {
  PaginateFunction,
  Pagination,
  paginator,
} from '../common/paginator/paginator.service';
const paginate: PaginateFunction = paginator({ per_page: 10 });

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    filter?: string,
    per_page?: number,
    current_page?: number,
  ): Promise<{ events: Event[]; pagination: Pagination }> {
    if (filter) {
      const { data, meta } = await paginate(
        this.prisma.events,
        {
          where: {
            start_at: { gt: new Date() },
            title: { contains: filter },
          },
        },
        {
          per_page,
          current_page,
        },
      );
      return { events: data as Event[], pagination: meta };
    } else {
      const { data, meta } = await paginate(
        this.prisma.events,
        {
          where: {
            start_at: { gt: new Date() },
          },
        },
        { per_page, current_page },
      );
      return { events: data as Event[], pagination: meta };
    }
  }

  async findOne(id: number): Promise<EventWithWorkshopCounts> {
    const event = await this.prisma.events.findUnique({
      where: {
        id,
      },
      include: {
        Workshops: true,
      },
    });
    if (!event) {
      throw new NotFoundException();
    }
    const { Workshops, ...rest } = event;
    return { ...rest, total_workshops: Workshops.length };
  }

  async findOneDetails(id: number): Promise<EventWithWorkshopList> {
    const event = await this.prisma.events.findUnique({
      where: {
        id,
      },
      include: {
        Workshops: {
          where: {
            start_at: {
              gt: new Date(),
            },
          },
        },
      },
    });
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }
}
