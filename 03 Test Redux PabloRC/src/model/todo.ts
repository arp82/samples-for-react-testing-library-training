export interface TodoEntity {
    userId: number
    id: number;
    title: string;
    completed: boolean;
}

export const createDefaultTodoEntity = () => ({
    userId: -1,
    id: -1,
    title: '',
    completed: false,
})