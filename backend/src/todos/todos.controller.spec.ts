import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

const mockTodosService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('TodosController', () => {
  let controller: TodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call todosService.create and return the result', async () => {
      const createTodoDto: CreateTodoDto = {
        text: 'New Task',
        categoryId: 'some-category-id',
      };
      const expectedResult = { id: 'new-task-id', ...createTodoDto };
      mockTodosService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createTodoDto);

      expect(mockTodosService.create).toHaveBeenCalledWith(createTodoDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should call todosService.findAll with a categoryId', async () => {
      const categoryId = 'some-category-id';
      const expectedResult = [{ id: 'task-1', text: 'Task One' }];
      mockTodosService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll(categoryId);

      expect(mockTodosService.findAll).toHaveBeenCalledWith(categoryId);
      expect(result).toEqual(expectedResult);
    });

    it('should call todosService.findAll without a categoryId', async () => {
      const expectedResult = [{ id: 'task-1', text: 'Task One' }];
      mockTodosService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(mockTodosService.findAll).toHaveBeenCalledWith(undefined);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should call todosService.findOne and return the result', async () => {
      const taskId = 'some-task-id';
      const expectedResult = { id: taskId, text: 'A Task' };
      mockTodosService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(taskId);

      expect(mockTodosService.findOne).toHaveBeenCalledWith(taskId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should call todosService.update and return the result', async () => {
      const taskId = 'some-task-id';
      const updateTodoDto: UpdateTodoDto = { isCompleted: true };
      const expectedResult = { id: taskId, isCompleted: true };
      mockTodosService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(taskId, updateTodoDto);

      expect(mockTodosService.update).toHaveBeenCalledWith(
        taskId,
        updateTodoDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should call todosService.remove and return the result', async () => {
      const taskId = 'some-task-id';
      const expectedResult = { id: taskId, text: 'Deleted Task' };
      mockTodosService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(taskId);

      expect(mockTodosService.remove).toHaveBeenCalledWith(taskId);
      expect(result).toEqual(expectedResult);
    });
  });
});
