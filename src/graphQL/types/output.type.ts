export type GetMeOutput = {
  createdAt: number;
  email: string;
  id: number;
  name: string;
  profileImageUrl: string;
  updatedAt: number;
};

export type GetTodoOutput = {
  completedAt?: number;
  contents: string;
  createdAt: number;
  finishedAt?: number;
  id: number;
  startedAt?: number;
  updatedAt: number;
};

export type GetTodosOutput = {
  timeUndecidedTodos: GetTodoOutput[];
  todos: GetTodoOutput[];
};

export type GetReviewOutput = {
  contents: string;
  createdAt: number;
  finishedAt?: number;
  id: number;
  startedAt?: number;
  updatedAt: number;
};

export type GetReviewsOutput = {
  timeUndecidedReviews: GetReviewOutput[];
  reviews: GetReviewOutput[];
};
