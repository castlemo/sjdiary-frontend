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
  todoPeriodId?: number;
  isTime?: boolean;
  startedAt?: Date;
  endedAt?: Date;
}
