import { ApolloError, gql, useMutation } from '@apollo/client';

import { GET_TODOS } from '../queries';
import { DeleteTodoInput } from '../types';

export const DELETE_TODO = gql`
  mutation DeleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input)
  }
`;

type UseDeleteTodoMutation = {
  deleteTodo: (input: DeleteTodoInput) => void;
  loading: boolean;
  error?: ApolloError;
};

type Variables = {
  input: DeleteTodoInput;
};

export const useDeleteTodoMutation = (): UseDeleteTodoMutation => {
  const [deleteTodoMutation, { loading, error }] = useMutation<
    boolean,
    Variables
  >(DELETE_TODO, {
    refetchQueries: [GET_TODOS],
  });

  const deleteTodo = async (input: DeleteTodoInput) => {
    await deleteTodoMutation({
      variables: {
        input,
      },
    });
  };

  return {
    deleteTodo,
    loading,
    error,
  };
};
