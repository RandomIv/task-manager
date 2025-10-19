import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { PrismaService } from '../prisma';
import { BadRequestException } from '@nestjs/common';

const mockPrismaService = {
  task: {
    count: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const categoryId = 'd0e1b2c3-a4b5-c6d7-e8f9-a0b1c2d3e4f5';
    const createTodoDto = { text: 'New Task', categoryId };

    it('should create a task if category has less than 5 tasks', async () => {
      mockPrismaService.task.count.mockResolvedValue(4);
      mockPrismaService.task.create.mockResolvedValue({
        id: 'some-task-id',
        ...createTodoDto,
      });

      const result = await service.create(createTodoDto);

      expect(mockPrismaService.task.count).toHaveBeenCalledWith({
        where: { categoryId },
      });
      expect(mockPrismaService.task.create).toHaveBeenCalledWith({
        data: createTodoDto,
        include: { category: true },
      });
      expect(result).toEqual({ id: 'some-task-id', ...createTodoDto });
    });

    it('should throw BadRequestException if category already has 5 tasks', async () => {
      mockPrismaService.task.count.mockResolvedValue(5);

      await expect(service.create(createTodoDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.create(createTodoDto)).rejects.toThrow(
        'This category already has 5 tasks',
      );

      expect(mockPrismaService.task.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const mockTasks = [{ id: '1', text: 'Task 1' }];
      mockPrismaService.task.findMany.mockResolvedValue(mockTasks);

      const result = await service.findAll();
      expect(result).toEqual(mockTasks);
      expect(mockPrismaService.task.findMany).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    const taskId = 'a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6';
    const updateDto = { isCompleted: true };

    it('should update a task successfully', async () => {
      const mockTask = { id: taskId, text: 'Old Task' };
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);
      mockPrismaService.task.update.mockResolvedValue({
        ...mockTask,
        ...updateDto,
      });

      const result = await service.update(taskId, updateDto);
      expect(result.isCompleted).toBe(true);
      expect(mockPrismaService.task.update).toHaveBeenCalledWith({
        where: { id: taskId },
        data: updateDto,
        include: { category: true },
      });
    });
  });

  describe('remove', () => {
    const taskId = 'a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6';
    it('should remove a task successfully', async () => {
      const mockTask = { id: taskId, text: 'Task to delete' };
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);
      mockPrismaService.task.delete.mockResolvedValue(mockTask);

      await service.remove(taskId);
      expect(mockPrismaService.task.delete).toHaveBeenCalledWith({
        where: { id: taskId },
      });
    });
  });
});
