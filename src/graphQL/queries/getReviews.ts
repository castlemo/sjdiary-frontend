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

  return {
    data,
    loading,
    error: loading ? undefined : error,
    refetch,
  };
};
