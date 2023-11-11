import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import {
  Event,
  EventWithWorkshopCounts,
  EventWithWorkshopList,
} from './event.dto';
import { Pagination } from '../common/paginator/paginator.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAllEvents(
    @Query('filter') filter?: string,
    @Query('per_page', new DefaultValuePipe(10), ParseIntPipe)
    per_page?: number,
    @Query('current_page', new DefaultValuePipe(1), ParseIntPipe)
    current_page?: number,
  ): Promise<{
    events: Event[];
    pagination: Pagination;
  }> {
    return await this.eventService.findAll(filter, per_page, current_page);
  }

  @Get(':id')
  getEventById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EventWithWorkshopCounts> {
    return this.eventService.findOne(id);
  }

  @Get(':id/workshop')
  getEventWithWorkshopListById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EventWithWorkshopList> {
    return this.eventService.findOneDetails(id);
  }
}
