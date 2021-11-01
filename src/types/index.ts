export interface User {
  id: number;
  motto: string;
  email: string;
  name: string;
  nickname?: string;
  profileImageUrl: string;
}

export type GetTodosType = 'ALL' | 'CATEGORY' | 'TODAY';

export interface Todo {
  id: number;
  contents: string;
  allIndex: number;
  categoryIndex?: number;
  checkedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  TodoPeriod?: TodoPeriod;
  Category?: Category;
}

export interface TodoPeriod {
  id: number;
  isTime: boolean;
  startedAt: Date;
  endedAt: Date;
}

export type CreateTodo = Pick<Todo, 'contents' | 'Category' | 'TodoPeriod'>;
export interface UpdateTodo {
  id: number;
  contents: string;
  allIndex: number;
  categoryIndex?: number;
  checkedAt?: Date;
  TodoPeriod?: Partial<TodoPeriod>;
  Category?: Partial<Category>;
}

export interface CreateTodoMutationInput {
  contents: string;
  categoryId?: number;
  isTime?: boolean;
  startedAt?: Date;
  endedAt?: Date;
}

export interface UpdateTodoMutationInput {
  todoId: number;
  contents?: string;
  categoryId?: number;
  isTime?: boolean;
  startedAt?: Date;
  endedAt?: Date;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  createdAt?: number;
  updatedAt?: number;
}

export type CreateCategory = Pick<Category, 'name' | 'color'>;

export interface TodoModalInfo {
  left: number;
  top: number;
  type: 'CREATE' | 'UPDATE';
}
