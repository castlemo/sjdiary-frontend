export type MeOutput = {
  createdAt: number;
  email: string;
  id: number;
  name: string;
  profileImageUrl: string;
  updatedAt: number;
};

export type TodoOutput = {
  completedAt?: number;
  contents: string;
  createdAt: number;
  finishedAt?: number;
  id: number;
  startedAt?: number;
  updatedAt: number;
};

export type TodosOutput = {
  noPeriodTodos: TodoOutput[];
  timeUndecidedTodos: TodoOutput[];
  todos: TodoOutput[];
};
