'use client';

import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import {CircleDot } from 'lucide-react';

import { Todo, Category } from '@/types';
import * as api from '@/lib/api';
import { AddTodoForm } from '@/components/AddTodoForm';
import { CategoryFilter } from '@/components/CategoryFilter';
import { TodoList } from '@/components/TodoList';
import { Button } from '@/components/ui/button';

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredCategory, setFilteredCategory] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [formApiError, setFormApiError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const [todosData, categoriesData] = await Promise.all([
                api.getTodos(filteredCategory),
                api.getCategories(),
            ]);
            setTodos(todosData);
            setCategories(categoriesData);
        } catch (err) {
            setError('Failed to fetch data. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [filteredCategory]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAddTodo = async (data: api.NewTodoData) => {
        setFormApiError(null);
        try {
            await api.createTodo(data);
            toast.success('Task added successfully!');
            fetchData();
        } catch (err: any) {
            if (err.response && err.response.status === 400) {
                setFormApiError(err.response.data.message || 'Cannot add more than 5 tasks to this category.');
            } else {
                toast.error('Failed to add task.');
            }
        }
    };

    const showUndoToast = (message: string, onUndo: () => void, onTimeout: () => void) => {
        const toastId = toast.custom((t) => (
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-background shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 h-full`}
            >
                <div className="flex-1 w-0 flex items-center justify-center">
                    <p className="font-medium text-foreground mu-4">{message}</p>
                </div>
                <div className="flex border-l border-border">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            onUndo();
                            toast.dismiss(t.id);
                        }}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        Undo
                    </Button>
                </div>
            </div>
        ));

        const timer = setTimeout(() => {
            onTimeout();
            toast.dismiss(toastId);
        }, 5000);

        return { timer, toastId };
    };

    const handleToggleComplete = (id: string, completed: boolean) => {
        if (!completed) {
            api.updateTodoStatus(id, false).then(fetchData);
            return;
        }

        setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: true } : t));

        const { timer } = showUndoToast('Task marked as complete.',
            () => {
                clearTimeout(timer);
                setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: false } : t));
            },
            () => {
                api.deleteTodo(id).then(() => {
                    toast.success('Task removed.');
                    fetchData();
                }).catch(() => toast.error('Failed to remove task.'));
            }
        );
    };

    const handleDelete = (id: string) => {
        const originalTodos = [...todos];
        setTodos(prev => prev.filter(t => t.id !== id));

        const { timer } = showUndoToast('Task deleted.',
            () => {
                clearTimeout(timer);
                setTodos(originalTodos);
            },
            () => {
                api.deleteTodo(id)
                    .then(() => toast.success('Task permanently deleted.'))
                    .catch(() => {
                        toast.error('Failed to delete task.');
                    });
            }
        );
    };

    const renderContent = () => {
        if (loading) {
            return <div className="flex justify-center items-center py-10"><CircleDot className="h-8 w-8 animate-spin" /></div>;
        }
        if (error) {
            return <div className="text-center py-10 text-destructive">{error}</div>;
        }
        return <TodoList todos={todos} onToggleComplete={handleToggleComplete} onDelete={handleDelete} />;
    };

    return (
        <div className="page-container">
            <header className="heading-page">
                <h1 className="text-4xl font-bold text-center">Task Manager</h1>
            </header>

            <section className="heading-section">
                <AddTodoForm categories={categories} onSubmit={handleAddTodo} apiError={formApiError} />
            </section>

            <section className="heading-card">
                <CategoryFilter
                    categories={categories}
                    selectedCategory={filteredCategory}
                    onFilterChange={setFilteredCategory}
                />
                {renderContent()}
            </section>
        </div>
    );
}