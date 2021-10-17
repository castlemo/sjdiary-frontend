export interface User {
  id: number;
  motto: string;
  email: string;
  name: string;
  nickname?: string;
  profileImageUrl: string;
}

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

export type CreateTodo = Pick<Todo, 'contents'>;

export interface Category {
  id: number;
  name: string;
  color: string;
  createdAt: number;
  updatedAt: number;
}

export type CreateCategory = Pick<Category, 'name' | 'color'>;
