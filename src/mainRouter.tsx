/* eslint-disable no-nested-ternary */
import { useQuery } from '@apollo/client';
import { ifError } from 'assert';
import {
  useHistory,
  Switch,
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';

import { useAuth0 } from './auth0';
import {
  SigninPage,
  SignupPage,
  MainPage,
  LoadingPage,
  NotFoundPage,
} from './components/pages';
import { API_URL } from './constant';
import { VERIFY_USER } from './graphQL/queries';
import { Test } from './test';
import { consoleLog } from './utils';

const TiryRoute = ({
  children,
  ...props
}: RouteProps & {
  children?: JSX.Element | null;
}) => {
  const { isAuthenticated } = useAuth0();
  const history = useHistory();

  const {
    loading: loadingVerifyUser,
    error,
    data: verifyUserData,
  } = useQuery<{ verifyUser: boolean }>(VERIFY_USER, {
    fetchPolicy: 'network-only',
  });

  const isUser = !!verifyUserData?.verifyUser;

  consoleLog({ isAuthenticated, isUser, path: history.location.pathname });

  const render = (routeProps: RouteComponentProps) => {
    if (!isAuthenticated) {
      return <Redirect to="/signin" />;
    }

    if (loadingVerifyUser) {
      return <LoadingPage />;
    }

    if (!isUser) {
      return <Redirect to="/signup" />;
    }

    return props.render ? props.render(routeProps) : children;
  };

  return <Route {...props} render={render} />;
};

export const MainRouter = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Switch>
      <Route path="/signin">
        <SigninPage />
      </Route>

      <Route path="/signup">
        <SignupPage />
      </Route>

      <TiryRoute path="/">
        <MainPage />
      </TiryRoute>

      <Route path="/test">
        <Test />
      </Route>

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};
