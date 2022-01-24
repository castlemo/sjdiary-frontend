import { ApolloError, gql, QueryHookOptions, useQuery } from '@apollo/client';

import { TodoOutput, TodosOutput, TodosQueryInput } from '../types';

const REIVEWS = gql`
  query TODOS($input: TodosInput!) {
    reviews(input: $input) {
      id
      contents
      startedAt
      finishedAt
      completedAt
      createdAt
      updatedAt
    }
  }
`;

type UseGetTodosQuery = {
  data?: TodosOutput;
  loading: boolean;
  error?: ApolloError;
  refetch: (variables?: TodosQueryInput) => void;
};

interface Data {
  todos: TodoOutput[];
}

// test code
const now = new Date();
const tNow = +now;

const year = now.getFullYear();
const month = now.getMonth();
const date = now.getDate();

const tempData: TodosOutput = {
  todos: [
    {
      id: 0,
      contents: '0번투두',
      startedAt: +new Date(year, month, date, 0, 30),
      finishedAt: +new Date(year, month, date, 1, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 1,
      contents: '1번투두',
      startedAt: +new Date(year, month, date, 1, 30),
      finishedAt: +new Date(year, month, date, 2, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 2,
      contents: '2번투두',
      startedAt: +new Date(year, month, date, 2, 30),
      finishedAt: +new Date(year, month, date, 3, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 3,
      contents: '3번투두',
      startedAt: +new Date(year, month, date, 3, 30),
      finishedAt: +new Date(year, month, date, 4, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 4,
      contents: '4번투두',
      startedAt: +new Date(year, month, date, 4, 30),
      finishedAt: +new Date(year, month, date, 5, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 9,
      contents: '9번투두',
      startedAt: +new Date(year, month, date, 0, 0),
      finishedAt: +new Date(year, month, date, 0, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 10,
      contents: '10번투두',
      startedAt: +new Date(year, month, date, 6, 0),
      finishedAt: +new Date(year, month, date, 7, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 11,
      contents: '11번투두',
      startedAt: +new Date(year, month, date, 20, 30),
      finishedAt: +new Date(year, month, date, 21, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 12,
      contents: '12번투두',
      startedAt: +new Date(year, month, date, 22, 0),
      finishedAt: +new Date(year, month, date, 22, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 13,
      contents: '13번투두',
      startedAt: +new Date(year, month, date, 23, 0),
      finishedAt: +new Date(year, month, date, 24, 0),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 14,
      contents: '14번투두',
      startedAt: +new Date(year, month, date, 7, 30),
      finishedAt: +new Date(year, month, date, 20, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
  ],
  noPeriodTodos: [
    {
      id: 5,
      contents: 'no5번투두',
      startedAt: undefined,
      finishedAt: undefined,
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 6,
      contents: 'no6번투두',
      startedAt: undefined,
      finishedAt: undefined,
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 7,
      contents: 'no7번투두',
      startedAt: undefined,
      finishedAt: undefined,
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 8,
      contents: 'no8번투두',
      startedAt: undefined,
      finishedAt: undefined,
      createdAt: tNow,
      updatedAt: tNow,
    },
  ],
  timeUndecidedTodos: [
    {
      id: 5,
      contents: 'no5번투두',
      startedAt: undefined,
      finishedAt: undefined,
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 6,
      contents: 'no6번투두',
      startedAt: undefined,
      finishedAt: undefined,
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 7,
      contents: 'no7번투두',
      startedAt: undefined,
      finishedAt: undefined,
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 8,
      contents: 'no8번투두',
      startedAt: undefined,
      finishedAt: undefined,
      createdAt: tNow,
      updatedAt: tNow,
    },
  ],
};

export const useTodosQuery = (
  input: TodosQueryInput,
  options?: QueryHookOptions<Data, TodosQueryInput>,
): UseGetTodosQuery => {
  // const {
  //   data: response,
  //   loading,
  //   error,
  //   refetch,
  // } = useQuery<Data, TodosQueryInput>(TODOS, {
  //   ...options,
  //   variables: input,
  // });

  // const data = response?.todos.reduce(
  //   (obj: ReturnsData, cur: TodoOutput) => {
  //     if (cur.startedAt && cur.finishedAt) {
  //       obj.todos.push(cur);
  //     } else {
  //       obj.todos.push(cur);
  //     }
  //     return obj;
  //   },
  //   { noPeriodTodos: [], todos: [] },
  // );

  // return {
  //   data,
  //   loading,
  //   error: loading ? undefined : error,
  // };

  return {
    data: tempData,
    loading: false,
    error: undefined,
    refetch: () => {},
  };
};
