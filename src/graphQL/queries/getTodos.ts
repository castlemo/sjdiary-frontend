import { ApolloError, gql, QueryHookOptions, useQuery } from '@apollo/client';

import { GetTodoOutput, GetTodosOutput, GetTodosQueryInput } from '../types';

export const GET_TODOS = gql`
  query Todos($input: TodosInput!) {
    todos(input: $input) {
      id
      content
      startedAt
      finishedAt
      completedAt
    }
  }
`;

type Variables = {
  input: GetTodosQueryInput;
};

type Data = {
  todos: GetTodoOutput[];
};

type UseGetTodosQuery = {
  data?: GetTodosOutput;
  loading: boolean;
  error?: ApolloError;
  refetch: (variables?: Variables) => void;
};

export const useGetTodosQuery = (
  input: GetTodosQueryInput,
  today: Date,
  options?: QueryHookOptions<Data, Variables>,
): UseGetTodosQuery => {
  const {
    data: response,
    loading,
    error,
    refetch,
  } = useQuery<Data, Variables>(GET_TODOS, {
    ...options,
    variables: { input },
  });

  const nowYear = today.getFullYear();
  const nowMonth = today.getMonth();
  const nowDate = today.getDate();

  const data = response?.todos.reduce(
    (obj: GetTodosOutput, cur: GetTodoOutput) => {
      if (cur.startedAt && cur.finishedAt) {
        const todoStartDate = new Date(cur.startedAt);
        const startYear = todoStartDate.getFullYear();
        const startMonth = todoStartDate.getMonth();
        const startDate = todoStartDate.getDate();

        const todoFinishDate = new Date(cur.finishedAt);
        const finishYear = todoFinishDate.getFullYear();
        const finishMonth = todoFinishDate.getMonth();
        const finishDate = todoFinishDate.getDate();

        if (
          nowYear === startYear &&
          nowYear === finishYear &&
          nowMonth === startMonth &&
          nowMonth === finishMonth &&
          nowDate === startDate &&
          nowDate === finishDate
        ) {
          obj.todos.push(cur);
        }
      } else {
        obj.timeUndecidedTodos.push(cur);
      }
      return obj;
    },
    { timeUndecidedTodos: [], todos: [] },
  );

  return {
    data,
    loading,
    error: loading ? undefined : error,
    refetch,
  };
};
