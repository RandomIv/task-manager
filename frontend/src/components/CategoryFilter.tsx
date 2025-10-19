'use client';

import { Category } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string | undefined;
    onFilterChange: (category: undefined | string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onFilterChange }: CategoryFilterProps) {
    return (
        <div className="mb-4 flex justify-end">
            <Select
                value={selectedCategory}
                onValueChange={(val) => onFilterChange(val === "all" ? undefined : val)}
            >
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="text-sm bg-gray-50">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
