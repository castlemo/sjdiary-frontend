export type MeOutput = {
  createdAt: number;
  email: string;
  id: number;
  name: string;
  profileImageUrl: string;
  updatedAt: number;
};

export type TodoOutput = {
  completedAt?: Date;
  contents: string;
  createdAt: Date;
  finishedAt: Date;
  id: number;
  startedAt: Date;
  updatedAt: Date;
};
