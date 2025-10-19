import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma';
import { CategoriesModule } from './categories';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [PrismaModule, CategoriesModule, TodosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
