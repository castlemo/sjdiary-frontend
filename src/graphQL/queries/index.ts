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
