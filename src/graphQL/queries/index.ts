import { gql } from '@apollo/client';

export * from './todos';

export const VERIFY_USER = gql`
  query VerifyUser {
    verifyUser
  }
`;

export const ME = gql`
  query Me {
    me {
      createdAt
      email
      id
      name
      profileImageUrl
      updatedAt
    }
  }
`;
