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

  const data = response?.todos.reduce(
    (obj: GetTodosOutput, cur: GetTodoOutput) => {
      if (cur.startedAt && cur.finishedAt) {
        obj.todos.push(cur);
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
