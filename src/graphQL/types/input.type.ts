export type CreateUserInput = {
  email: string;
  name: string;
  profileImageUrl: string;
};

export type CreateTodoMutationInput = {
  contents?: string;
  finishedAt?: number;
  startedAt?: number;
};

export type CreateReviewMutationInput = CreateTodoMutationInput;

export type UpdateTodoMutationInput = {
  id: number;
  contents?: string;
  startedAt?: number;
  finishedAt?: number;
  completedAt?: number;
};

export type UpdateReviewMutationInput = Omit<
  UpdateTodoMutationInput,
  'completedAt'
>;

export type GetTodosQueryInput = {
  endDate: number;
  startDate: number;
};

export type GetReviewsQueryInput = GetTodosQueryInput;
