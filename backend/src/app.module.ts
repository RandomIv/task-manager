import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
