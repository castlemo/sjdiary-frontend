import { gql } from '@apollo/client';

export const VERIFY_USER = gql`
  query VerifyUser {
    verifyUser
  }
`;

export const ME = gql`
  query Me {
    me {
      createdAt
      deletedAt
      email
      id
      name
      profileImageUrl
      updatedAt
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      color
      name
    }
  }
`;

export const GET_TODOS = gql`
  query GetTodos($input: GetTodosInput!) {
    getTodos(input: $input) {
      id
      contents
      allIndex
      categoryIndex
      checkedAt
      createdAt
      updatedAt
      Category {
        id
        name
        color
      }
      TodoPeriod {
        id
        isTime
        startedAt
        endedAt
      }
    }
  }
`;
