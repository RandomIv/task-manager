import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    const { categoryId } = createTodoDto;

    const count = await this.prisma.task.count({
      where: {
        categoryId: categoryId,
      },
    });

    if (count >= 5) {
      throw new BadRequestException('This category already has 5 tasks');
    }

    return this.prisma.task.create({
      data: createTodoDto,
      include: {
        category: true,
      },
    });
  }

  findAll(categoryId?: string) {
    return this.prisma.task.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.prisma.task.update({
      where: { id },
      data: updateTodoDto,
      include: {
        category: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
