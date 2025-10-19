import {Todo} from '@/types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Trash2Icon } from 'lucide-react';

interface TodoItemProps {
    todo: Todo;
    onToggleComplete: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
}

export function TodoItem({ todo,  onToggleComplete, onDelete }: TodoItemProps) {
    return (
        <Card className={`${todo.completed ? 'card-task-completed' : 'card-task'}`}>
            <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <input
                        type="checkbox"
                        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={!!todo.completed}
                        onChange={(e) => onToggleComplete(todo.id, e.target.checked)}
                    />
                    <span className={`flex-grow ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
            {todo.text}
          </span>
                </div>
                <div className="flex items-center gap-4">
                    <Badge variant="secondary">{todo.category.name}</Badge>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(todo.id)}>
                        <Trash2Icon className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}