import { BrowserRouter as Router } from 'react-router-dom';

import { MainRouter } from './mainRouter';
import { GlobalStyle } from './styles/globalStyles';
import { AppDebug } from './AppDebug';

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <MainRouter />
      {process.env.REACT_APP_MODE === 'local' ? <AppDebug /> : null}
    </Router>
  );
};

export default App;
