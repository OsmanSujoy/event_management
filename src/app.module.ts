import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { WorkshopModule } from './workshop/workshop.module';
import { ReservationModule } from './reservation/reservation.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './common/others/http-error.filter';
import { LoggingInterceptor } from './common/others/logging.interceptor';

@Module({
  imports: [EventModule, WorkshopModule, ReservationModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
