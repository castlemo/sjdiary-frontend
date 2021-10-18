/* eslint-disable @typescript-eslint/no-shadow */
import { Auth0Error, Auth0UserProfile, WebAuth } from 'auth0-js';
import { History } from 'history';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { consoleLog } from '../utils';

export const useShouldCheckAuthLocalStorage = () => {
  const LOCAL_STORAGE_KEY = 'shouldCheckAuth';
  const localStorageValues = {
    true: 'true',
    false: 'false',
  } as const;

  const shouldCheckAuth =
    localStorage.getItem(LOCAL_STORAGE_KEY) === localStorageValues.true;

  const setShouldCheckAuth = (value: boolean) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      value ? localStorageValues.true : localStorageValues.false,
    );
  };

  return { shouldCheckAuth, setShouldCheckAuth };
};

export interface Auth0ContextInterface {
  user?: Auth0UserProfile;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
  getToken: () => Promise<string | undefined>;
  getUserProfile: () => Promise<Auth0UserProfile | undefined>;
}

interface AnyObject {
  [k: string]: string | number | boolean | AnyObject;
}

interface SessionData {
  accessToken?: string;
  expiresIn?: number;
  profile?: AnyObject;
}

const Auth0Context = createContext<Auth0ContextInterface>({
  user: undefined,
  isAuthenticated: false,
  isLoading: true,
  signIn: (): Promise<any> => Promise.resolve(),
  signOut: () => {},
  getToken: (): Promise<any> => Promise.resolve(),
  getUserProfile: (): Promise<any> => Promise.resolve(),
});
Auth0Context.displayName = 'Auth0Context';
const Auth0Provider = Auth0Context.Provider;

const AUTH_SCOPE = 'openid profile email';

export const useAuth0 = (): Auth0ContextInterface => useContext(Auth0Context);

export const Auth0Wrapper = ({
  history,
  children,
}: {
  history: History;
  children: JSX.Element | undefined;
}): JSX.Element => {
  const [auth0Client, setAuth0Client] = useState<WebAuth | undefined>(
    undefined,
  );
  const [auth0UserData, setAuth0UserData] = useState<any | undefined>(
    undefined,
  );

  const { shouldCheckAuth, setShouldCheckAuth } =
    useShouldCheckAuthLocalStorage();
  const [isLoading, setIsLoading] = useState<boolean>(shouldCheckAuth);

  const isAuthenticated = useMemo((): boolean => {
    if (auth0UserData?.profile !== undefined) {
      return true;
    }
    return false;
  }, [auth0UserData]);

  const signIn = () => {
    if (auth0Client) {
      try {
        setShouldCheckAuth(true);
        auth0Client?.authorize({
          connection: 'google-oauth2',
        });
      } catch (err) {
        console.error('Auth0Wrapper: SignIn error');
        console.error(err);
        setShouldCheckAuth(false);
      }
    }
  };

  const signOut = (): boolean => {
    history.push('/');
    if (auth0Client) {
      setShouldCheckAuth(false);
      auth0Client.logout({
        returnTo: `${window.location.origin}`,
        clientID: 'tiXYMoALWqPfcNOd6ZJ0b86auQqytkJo',
      });
      return true;
    }
    consoleLog('auth0Client is not set');
    return false;
  };

  /**
   * Receive new token from auth0 server
   */
  const fetchToken = useCallback(async (): Promise<{
    err: unknown;
    result: SessionData | undefined;
  }> => {
    if (auth0Client) {
      const { err, result } = await new Promise((resolve) => {
        auth0Client.checkSession(
          {
            audience: 'https://user.tiry',
            scope: AUTH_SCOPE,
          },
          (
            err: unknown,
            result?: SessionData & { idTokenPayload?: AnyObject },
          ) => {
            resolve({
              err,
              result: {
                accessToken: result?.accessToken,
                profile: result?.idTokenPayload,
                expiresIn: result?.expiresIn,
              },
            });
          },
        );
      });
      return { err, result };
    }
    return { err: undefined, result: undefined };
  }, [auth0Client]);

  /**
   * Check time and call fetchtoken if needed.
   *
   * Token that are to be expired in 10 min will be refetched by setTimeout in useEffet hook below
   */
  const getToken = useCallback(async (): Promise<string | undefined> => {
    // consoleLog('====================getToken================');
    // consoleLog({ auth0Client });
    // consoleLog{ isAuthenticated });
    // consoleLog('====================getToken================');
    if (!isAuthenticated) {
      return undefined;
    }

    if (auth0Client && auth0UserData !== undefined) {
      const utcTimeTenMinFromNow = Math.floor(+new Date() / 1000) + 600;
      const tokenExists = !!auth0UserData.accessToken;
      const tokenExpired = auth0UserData.profile.exp <= utcTimeTenMinFromNow;

      if (tokenExists && !tokenExpired) {
        // * if token exists and not expired yet, return token
        consoleLog('getToken: returning existing token');
        return auth0UserData.accessToken;
      }
      // * if token already expired, call fetchToken and return the result
      consoleLog('getToken: fetching new token');

      const { result } = await fetchToken();
      setAuth0UserData({
        ...result,
      });

      return result?.accessToken;
    }

    consoleLog('auth0Client is not set');
    return undefined;
  }, [auth0UserData, auth0Client, fetchToken]);

  interface Auth0UserInfoResult {
    profile: Auth0UserProfile | undefined;
    error: Auth0Error | null;
  }

  const fetchUserProfile = useCallback(
    async (accessToken: string): Promise<Auth0UserInfoResult> => {
      if (auth0Client) {
        return new Promise<Auth0UserInfoResult>((resolve) => {
          auth0Client.client.userInfo(accessToken, (error, profile) => {
            resolve({ profile, error });
          });
        });
      }

      consoleLog('fetchUserProfile: auth0Client is not set, too bad :(');
      return { profile: undefined, error: { error: 'auth0Client' } };
    },
    [auth0Client],
  );

  const getAuth0UserProfile = useCallback(async (): Promise<
    Auth0UserProfile | undefined
  > => {
    if (auth0UserData?.profile !== undefined) {
      return auth0UserData.profile;
    }

    if (auth0UserData) {
      const { profile } = await fetchUserProfile(auth0UserData?.accessToken);
      return profile;
    }

    consoleLog('auth0UserData is not set');
    return undefined;
  }, [auth0UserData, fetchUserProfile]);

  useEffect(() => {
    const webAuth = new WebAuth({
      domain: 'tiry.us.auth0.com',
      clientID: 'tiXYMoALWqPfcNOd6ZJ0b86auQqytkJo',
      audience: 'https://user.tiry',
      redirectUri: window.location.origin,
      responseType: 'code token id_token',
      scope: AUTH_SCOPE,
    });
    setAuth0Client(webAuth);

    if (!shouldCheckAuth) {
      return;
    }

    setIsLoading(true);
    // call checkSession() to get if logged in
    webAuth.checkSession(
      {
        audience: 'https://user.tiry',
        scope: AUTH_SCOPE,
      },
      (err: unknown, result?: SessionData & { idTokenPayload?: AnyObject }) => {
        if (err) {
          console.error(err);
        }
        consoleLog('============accessToken============');
        consoleLog(result?.accessToken);
        consoleLog('============accessToken============');
        if (result !== undefined) {
          setAuth0UserData({
            accessToken: result?.accessToken,
            profile: result?.idTokenPayload ? result.idTokenPayload : undefined, // auth0UserData.profile.exp
            expiresIn: result?.expiresIn, // ? 7200 seconds
          });
        }
        setIsLoading(false);
      },
    );
  }, [shouldCheckAuth]);

  // call refreshToken every 600 sec
  useEffect(() => {
    let tokenTimer: undefined | NodeJS.Timeout;
    const refreshToken = () => {
      getToken();
      tokenTimer = setTimeout(() => {
        refreshToken();
      }, 600000);
    };
    refreshToken();
    return () => {
      if (tokenTimer !== undefined) {
        clearTimeout(tokenTimer);
      }
    };
  }, [getToken]);

  return (
    <Auth0Provider
      value={{
        user: auth0UserData?.profile,
        isAuthenticated,
        isLoading,
        signIn,
        signOut,
        getToken,
        getUserProfile: getAuth0UserProfile,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
