import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { WorkshopWithReservationCounts } from './workshop.dto';
import { CreateReservation } from '../reservation/reservation.dto';

@Controller('workshop')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Get(':id')
  getEventById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WorkshopWithReservationCounts> {
    return this.workshopService.findOne(id);
  }

  @Post(':id/reservation')
  createReservationOnWorkshop(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateReservation,
  ) {
    console.log(id);
    console.log(data);
    return this.workshopService.createReservationOn(id, data);
  }
}
