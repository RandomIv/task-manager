import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma';
import { CategoriesModule } from './categories';

@Module({
  imports: [PrismaModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
