import { ApolloError, gql, useMutation } from '@apollo/client';

import { GET_REVIEWS } from '../queries';
import { DeleteReviewInput } from '../types';

export const DELETE_REVIEW = gql`
  mutation DeleteReview($input: DeleteReviewInput!) {
    deleteReview(input: $input)
  }
`;

type UseDeleteReviewMutation = {
  deleteReview: (input: DeleteReviewInput) => void;
  loading: boolean;
  error?: ApolloError;
};

type Variables = {
  input: DeleteReviewInput;
};

export const useDeleteReviewMutation = (): UseDeleteReviewMutation => {
  const [deleteReviewMutation, { loading, error }] = useMutation<
    boolean,
    Variables
  >(DELETE_REVIEW, {
    refetchQueries: [GET_REVIEWS],
  });

  const deleteReview = async (input: DeleteReviewInput) => {
    await deleteReviewMutation({
      variables: {
        input,
      },
    });
  };

  return {
    deleteReview,
    loading,
    error,
  };
};
