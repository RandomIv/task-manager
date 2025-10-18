import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany();
  }
}
