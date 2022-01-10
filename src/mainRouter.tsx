import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import { useAuth0 } from './auth0';
import { SigninPage, MainPage, NotFoundPage } from './components/pages';
import { LoadingTemplate } from './components/templates';
import { ROUTES } from './constant';
import { CREATE_USER } from './graphQL/mutations';
import { VERIFY_USER } from './graphQL/queries';
import { ICreateUserInput } from './graphQL/types';

export const MainRouter = (): JSX.Element => {
  const { pathname } = useLocation();
  const { isLoading, isAuthenticated, getAuth0UserProfile } = useAuth0();

  const [requestCreateUser] = useMutation<boolean, ICreateUserInput>(
    CREATE_USER,
  );

  const {
    data: dataVerifyUser,
    loading: loadingVerifyUser,
    error: errorVerifyUser,
  } = useQuery<{ verifyUser: boolean }>(VERIFY_USER, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const isVerifyUser: boolean | undefined =
      dataVerifyUser?.verifyUser ?? undefined;
    const createUser = async () => {
      const auth0UserProfile = await getAuth0UserProfile();
      if (auth0UserProfile) {
        requestCreateUser({
          variables: {
            input: {
              email: auth0UserProfile.email ?? '',
              name: auth0UserProfile.name ?? '',
              profileImageUrl: auth0UserProfile.picture ?? '',
            },
          },
        });
      }
    };

    if (isAuthenticated && !isVerifyUser) {
      createUser();
    }
  }, [isAuthenticated, dataVerifyUser, dataVerifyUser]);

  if (loadingVerifyUser || isLoading) {
    return <LoadingTemplate />;
  }

  if (errorVerifyUser) {
    // TODO Error Page 작업
    console.log({ errorVerifyUser });
  }

  if (!isAuthenticated && pathname !== ROUTES.SIGNIN) {
    return <Navigate to={ROUTES.SIGNIN} />;
  }

  if (isAuthenticated && dataVerifyUser && pathname === ROUTES.SIGNIN) {
    return <Navigate to={ROUTES.MAIN} />;
  }

  return (
    <Routes>
      {/* main */}
      <Route path={ROUTES.MAIN} element={<MainPage />} />

      {/* Sign In */}
      <Route path={ROUTES.SIGNIN} element={<SigninPage />} />

      {/* Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
