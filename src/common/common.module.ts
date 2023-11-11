import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { PrismaModule } from './prisma.module';
import { StartupModule } from './startup.module';

@Module({
  imports: [ConfigModule, PrismaModule, StartupModule],
  exports: [ConfigModule, PrismaModule, StartupModule],
})
export class CommonModule {}
