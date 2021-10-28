export const API_URL = !(process.env.REACT_APP_MODE === 'local')
  ? 'https://tiry-backend.herokuapp.com/graphql'
  : 'http://localhost:9000/graphql';

export const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
