import { gql } from '@apollo/client';

export const VERIFY_USER = gql`
  query VerifyUser {
    verifyUser
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      motto
      email
      name
      nickname
      profileImageUrl
      UserSetting {
        id
        theme
        startOfWeek
      }
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
    }
  }
`;
