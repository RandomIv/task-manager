import { Todo} from '@/types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onToggleComplete: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggleComplete, onDelete }: TodoListProps) {
    if (todos.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-muted-foreground">No tasks yet. Add one to get started!</p>

            </div>
        );
    }

    return (
        <div className="space-y-3">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}