export const API_URL =
  process.env.REACT_APP_MODE === 'production'
    ? 'https://api.mathpang.com/graphql'
    : 'http://localhost:9000/graphql';
