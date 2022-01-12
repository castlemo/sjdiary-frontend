import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from 'styled-components';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Wrapper } from './auth0';
import { GraphQLProvider } from './graphQL/graphQLProvider';
import { theme } from './styles/theme';
import { Test } from './test';

export const history = createBrowserHistory();

// ReactDOM.render(
//   <Auth0Wrapper>
//     <GraphQLProvider>
//       <ThemeProvider theme={theme}>
//         <App />
//       </ThemeProvider>
//     </GraphQLProvider>
//   </Auth0Wrapper>,
//   document.getElementById('root'),
// );
ReactDOM.render(<Test />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
