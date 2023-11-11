import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkshopWithReservationCounts } from './workshop.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateReservation } from '../reservation/reservation.dto';

@Injectable()
export class WorkshopService {
  constructor(private readonly prisma: PrismaService) {}

  // create(createWorkshopDto: CreateWorkshopDto) {
  //   return 'This action adds a new workshop';
  // }
  // findAll() {
  //   return `This action returns all workshop`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} workshop`;
  // }
  // update(id: number, updateWorkshopDto: UpdateWorkshopDto) {
  //   return `This action updates a #${id} workshop`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} workshop`;
  // }

  async findOne(id: number): Promise<WorkshopWithReservationCounts> {
    const workshop = await this.prisma.workshops.findUnique({
      where: {
        id,
      },
      include: {
        Reservations: true,
      },
    });
    if (!workshop) {
      throw new NotFoundException();
    }
    const { Reservations, ...rest } = workshop;
    return { ...rest, total_reservations: Reservations.length };
  }

  async createReservationOn(id: number, data: CreateReservation) {
    const result = await this.prisma.reservations.create({
      data: {
        ...data,
        workshop_id: id,
      },
      // include: {
      //   Workshops: {
      //     include: {
      //       Events: true,
      //     },
      //   },
      // },
      select: {
        id: true,
        name: true,
        email: true,
        Workshops: {
          select: {
            id: true,
            title: true,
            description: true,
            start_at: true,
            end_at: true,
            Events: {
              select: {
                id: true,
                title: true,
                start_at: true,
                end_at: true,
              },
            },
          },
        },
      },
    });
    if (!result) {
      throw new NotFoundException();
    }
    const { Workshops, ...reservation } = result;
    const { Events, ...workshop } = Workshops;
    return { reservation: reservation, event: Events, workshop: workshop };
  }
}
