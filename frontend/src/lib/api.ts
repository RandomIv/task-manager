import axios from 'axios';
import { Todo, Category } from '@/types';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface NewTodoData {
    text: string;
    categoryId: string;
}

export const getTodos = (category?: string): Promise<Todo[]> => {
    const params = category ? { categoryId: category } : {};
    return apiClient.get('/todos', { params }).then(res => res.data);
};

export const getCategories = (): Promise<Category[]> => {
    return apiClient.get('/categories').then(res => res.data);
};

export const createTodo = (data: NewTodoData): Promise<Todo> => {
    return apiClient.post('/todos', data).then(res => res.data);
};

export const updateTodoStatus = (id: string, completed: boolean): Promise<Todo> => {
    return apiClient.patch(`/todos/${id}`, { completed }).then(res => res.data);
};

export const deleteTodo = (id: string): Promise<void> => {
    return apiClient.delete(`/todos/${id}`).then(res => res.data);
};