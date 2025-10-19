export interface Todo {
    id: string;
    text: string;
    category: {
        id: string;
        name: string;
    }
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: string;
    name: string;
}