import { useQuery } from '@apollo/client';
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
import { VERIFY_USER } from './graphQL/queries';
import { Test } from './test';

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
    // error: errorVerifyUser,
    data: verifyUserData,
  } = useQuery(VERIFY_USER, { fetchPolicy: 'network-only' });

  const isUser = verifyUserData?.verifyUser;
  const { pathname } = history.location;

  console.log(
    `history.location.pathname: ${history.location.pathname}, isUser: ${isUser}`,
  );

  const render = (routeProps: RouteComponentProps) => {
    if (!isAuthenticated) {
      console.log('isAuthenticated');
      return <SigninPage />;
    }

    if (loadingVerifyUser) {
      console.log('loadingVerifyUser');
      return <LoadingPage />;
    }

    // 로그인 후 Tiry유저가 아니면 signup
    if (!isUser) {
      console.log('isUser');
      return <Redirect to="/signup" />;
    }

    // 로그인 후 Tiry유저 이면 signin과 signup페이지 못들어가게
    if (['/signup', '/signin'].includes(pathname)) {
      return <Redirect to="/" />;
    }

    return props.render ? props.render(routeProps) : children;
  };

  return <Route {...props} render={render} />;
};

export const MainRouter = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  // useEffect(() => {
  //   const now = +new Date();
  //   (async () => {
  //     try {
  //       console.log(`*******************MainRouter:${now}****************`);
  //       console.log(`isAuthenticated: ${isAuthenticated}`);
  //       console.log(`isLoading: ${isLoading}`);

  //       console.log('====================user================');
  //       console.log(user);
  //       console.log('====================user================');

  //       const userProfile = await getUserProfile();
  //       console.log(`====================userProfile================`);
  //       console.log(userProfile);
  //       console.log(`====================userProfile================`);

  //       const token = await getToken();
  //       console.log(`====================token:${now}================`);
  //       console.log(token);
  //       console.log(`====================token:${now}================`);
  //       console.log(`*******************MainRouter:${now}****************`);
  //     } catch (e) {
  //       console.log(`*******************MainRouter:${now}****************`);
  //       console.error(e);
  //       console.log(`*******************MainRouter:${now}****************`);
  //     }
  //   })();
  // });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Switch>
      <Route path="/signin">
        {isAuthenticated ? <Redirect to="/" /> : <SigninPage />}
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
