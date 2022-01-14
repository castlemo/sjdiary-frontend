export type CreateUserInput = {
  email: string;
  name: string;
  profileImageUrl: string;
};

export type CreateTodoMutationInput = {
  contents: string;
  finishedAt: number;
  startedAt: number;
};

export type UpdateTodoMutationInput = {
  todoId: number;
  contents?: string;
  categoryId?: number;
  todoPeriodId?: number;
  isTime?: boolean;
  startedAt?: Date;
  endedAt?: Date;
};
