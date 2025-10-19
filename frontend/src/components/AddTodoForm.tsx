'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Category } from '@/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const formSchema = z.object({
    text: z.string().min(1, 'Task text cannot be empty'),
    categoryId: z.string().min(1, 'Please select a category'),
});

type FormValues = z.infer<typeof formSchema>;

interface AddTodoFormProps {
    categories: Category[];
    onSubmit: (data: FormValues) => Promise<void>;
    apiError?: string | null;
}

export function AddTodoForm({ categories, onSubmit, apiError }: AddTodoFormProps) {
    const { register, handleSubmit, formState: { errors, isSubmitting }, control, reset, setValue } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
        await onSubmit({
            text: data.text,
            categoryId: data.categoryId,
        });
        reset({ text: '', categoryId: data.categoryId });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-grow">
                <Input
                    {...register('text')}
                    placeholder="Enter new task..."
                    aria-invalid={!!errors.text}
                />
                {errors.text && <p className="text-destructive text-sm mt-1">{errors.text.message}</p>}
            </div>

            <div className="flex-shrink-0">
                <Controller
                    control={control}
                    name="categoryId"
                    render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="text-sm bg-gray-50">
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />

                {errors.categoryId && <p className="text-destructive text-sm mt-1">{errors.categoryId.message}</p>}
            </div>

            <div className="flex flex-col items-start gap-2">
                <Button type="submit" disabled={isSubmitting} className="btn-primary">
                    {isSubmitting ? 'Adding...' : 'Add Task'}
                </Button>

                {apiError && (
                    <p className="text-destructive text-sm mt-1">
                        {apiError}
                    </p>
                )}
            </div>
        </form>
    );
}

import { Controller } from 'react-hook-form';