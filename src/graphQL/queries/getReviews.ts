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
      content
      startedAt
      finishedAt
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

export const useGetReviewsQuery = (
  input: GetTodosQueryInput,
  today: Date,
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

  const nowYear = today.getFullYear();
  const nowMonth = today.getMonth();
  const nowDate = today.getDate();

  const data = response?.reviews.reduce(
    (obj: GetReviewsOutput, cur: GetReviewOutput) => {
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
          obj.reviews.push(cur);
        }
      } else {
        obj.timeUndecidedReviews.push(cur);
      }
      return obj;
    },
    { timeUndecidedReviews: [], reviews: [] },
  );

  return {
    data,
    loading,
    error: loading ? undefined : error,
    refetch,
  };
};
