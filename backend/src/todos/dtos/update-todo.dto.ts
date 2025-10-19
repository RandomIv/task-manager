import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsBoolean()
  @IsNotEmpty()
  isCompleted: boolean;
}
