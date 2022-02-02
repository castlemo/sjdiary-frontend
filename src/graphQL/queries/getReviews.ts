import { ApolloError, gql, QueryHookOptions, useQuery } from '@apollo/client';

import {
  GetReviewOutput,
  GetReviewsOutput,
  GetReviewsQueryInput,
  GetTodoOutput,
  GetTodosOutput,
  GetTodosQueryInput,
} from '../types';

export const GET_REVIEWS = gql`
  query Reviews($input: ReviewsInput!) {
    reviews(input: $input) {
      id
      contents
      startedAt
      finishedAt
      createdAt
      updatedAt
    }
  }
`;

type Data = {
  reviews: GetReviewOutput[];
};

type Variables = {
  input: GetReviewsQueryInput;
};

type UseGetReviewsQuery = {
  data?: GetReviewsOutput;
  loading: boolean;
  error?: ApolloError;
  refetch: (variables?: Variables) => void;
};

// test code
const now = new Date();
const tNow = +now;

const year = now.getFullYear();
const month = now.getMonth();
const date = now.getDate();

const tempData: GetReviewsOutput = {
  reviews: [
    {
      id: 30,
      contents: '0번리뷰',
      startedAt: +new Date(year, month, date, 0, 30),
      finishedAt: +new Date(year, month, date, 1, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 31,
      contents: '1번리뷰',
      startedAt: +new Date(year, month, date, 1, 30),
      finishedAt: +new Date(year, month, date, 2, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 32,
      contents: '2번리뷰',
      startedAt: +new Date(year, month, date, 2, 30),
      finishedAt: +new Date(year, month, date, 3, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 33,
      contents: '3번리뷰',
      startedAt: +new Date(year, month, date, 3, 30),
      finishedAt: +new Date(year, month, date, 4, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 34,
      contents: '4번리뷰',
      startedAt: +new Date(year, month, date, 4, 30),
      finishedAt: +new Date(year, month, date, 5, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 39,
      contents: '9번리뷰',
      startedAt: +new Date(year, month, date, 0, 0),
      finishedAt: +new Date(year, month, date, 0, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 40,
      contents: '10번리뷰',
      startedAt: +new Date(year, month, date, 6, 0),
      finishedAt: +new Date(year, month, date, 7, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 41,
      contents: '11번리뷰',
      startedAt: +new Date(year, month, date, 20, 30),
      finishedAt: +new Date(year, month, date, 21, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 42,
      contents: '12번리뷰',
      startedAt: +new Date(year, month, date, 22, 0),
      finishedAt: +new Date(year, month, date, 22, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 43,
      contents: '13번리뷰',
      startedAt: +new Date(year, month, date, 23, 0),
      finishedAt: +new Date(year, month, date, 24, 0),
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 44,
      contents: '14번리뷰',
      startedAt: +new Date(year, month, date, 7, 30),
      finishedAt: +new Date(year, month, date, 20, 30),
      createdAt: tNow,
      updatedAt: tNow,
    },
  ],
  timeUndecidedReviews: [
    {
      id: 35,
      contents: 'no5번리뷰',
      startedAt: undefined,
      finishedAt: undefined,
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 36,
      contents: 'no6번리뷰',
      startedAt: undefined,
      finishedAt: undefined,
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 37,
      contents: 'no7번리뷰',
      startedAt: undefined,
      finishedAt: undefined,
      createdAt: tNow,
      updatedAt: tNow,
    },
    {
      id: 38,
      contents: 'no8번리뷰',
      startedAt: undefined,
      finishedAt: undefined,
      createdAt: tNow,
      updatedAt: tNow,
    },
  ],
};

export const useGetReviewsQuery = (
  input: GetTodosQueryInput,
  options?: QueryHookOptions<Data, Variables>,
): UseGetReviewsQuery => {
  const {
    data: response,
    loading,
    error,
    refetch,
  } = useQuery<Data, Variables>(GET_REVIEWS, {
    ...options,
    variables: { input },
  });

  const data = response?.reviews.reduce(
    (obj: GetReviewsOutput, cur: GetReviewOutput) => {
      if (cur.startedAt && cur.finishedAt) {
        obj.reviews.push(cur);
      } else {
        obj.timeUndecidedReviews.push(cur);
      }
      return obj;
    },
    { timeUndecidedReviews: [], reviews: [] },
  );

  // return {
  //   data,
  //   loading,
  //   error: loading ? undefined : error,
  // };

  return {
    data: tempData,
    loading,
    error,
    refetch,
  };
};
