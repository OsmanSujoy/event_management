import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StartupService implements OnApplicationBootstrap {
  private readonly logger = new Logger(StartupService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    await this.prisma.events.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {
        title: 'Event 01',
        start_at: new Date('2023-11-12T00:00:00.00Z'),
        end_at: new Date('2023-11-15T00:00:00.00Z'),
        Workshops: {
          create: [
            {
              title: 'Workshop 011',
              description: 'Demo Workshop description',
              start_at: '2023-11-12T00:00:00.00Z',
              end_at: '2023-11-13T00:00:00.00Z',
            },
            {
              title: 'Workshop 012',
              description: 'Demo Workshop description',
              start_at: '2023-11-12T00:00:00.00Z',
              end_at: '2023-11-12T10:00:00.00Z',
            },
            {
              title: 'Workshop 013',
              description: 'Demo Workshop description',
              start_at: '2023-11-13T00:00:00.00Z',
              end_at: '2023-11-14T00:00:00.00Z',
            },
            {
              title: 'Workshop 014',
              description: 'Demo Workshop description',
              start_at: '2023-11-13T00:00:00.00Z',
              end_at: '2023-11-13T12:00:00.00Z',
            },
            {
              title: 'Workshop 015',
              description: 'Demo Workshop description',
              start_at: '2023-11-14T00:00:00.00Z',
              end_at: '2023-11-15T00:00:00.00Z',
            },
          ],
        },
      },
    });

    await this.prisma.events.upsert({
      where: {
        id: 2,
      },
      update: {},
      create: {
        title: 'Event 02',
        start_at: new Date('2023-11-14T00:00:00.00Z'),
        end_at: new Date('2023-11-20T00:00:00.00Z'),
        Workshops: {
          create: [
            {
              title: 'Workshop 021',
              description: 'Demo Workshop description',
              start_at: '2023-11-14T00:00:00.00Z',
              end_at: '2023-11-16T00:00:00.00Z',
            },
            {
              title: 'Workshop 012',
              description: 'Demo Workshop description',
              start_at: '2023-11-16T00:00:00.00Z',
              end_at: '2023-11-18T00:00:00.00Z',
            },
            {
              title: 'Workshop 013',
              description: 'Demo Workshop description',
              start_at: '2023-11-18T00:00:00.00Z',
              end_at: '2023-11-20T00:00:00.00Z',
            },
          ],
        },
      },
    });
    await this.prisma.events.upsert({
      where: {
        id: 3,
      },
      update: {},
      create: {
        title: 'Event 03',
        start_at: new Date('2023-11-19T00:00:00.00Z'),
        end_at: new Date('2023-11-30T00:00:00.00Z'),
        Workshops: {
          create: [
            {
              title: 'Workshop 031',
              description: 'Demo Workshop description',
              start_at: '2023-11-22T14:00:00.00Z',
              end_at: '2023-11-23T14:00:00.00Z',
            },
            {
              title: 'Workshop 032',
              description: 'Demo Workshop description',
              start_at: '2023-11-24T18:00:00.00Z',
              end_at: '2023-11-25T18:00:00.00Z',
            },
            {
              title: 'Workshop 033',
              description: 'Demo Workshop description',
              start_at: '2023-11-27T18:00:00.00Z',
              end_at: '2023-11-29T10:00:00.00Z',
            },
          ],
        },
      },
    });
    this.logger.warn('Dummy data insertion completed!');
  }
}
