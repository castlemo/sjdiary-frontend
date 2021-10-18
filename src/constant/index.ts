export const API_URL = !(process.env.REACT_APP_MODE === 'local')
  ? 'https://tiry-backend.herokuapp.com/graphql'
  : 'http://localhost:9000/graphql';
