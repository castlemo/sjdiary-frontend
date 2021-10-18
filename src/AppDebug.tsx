import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from './auth0';
import { consoleLog } from './utils';

export const AppDebug = () => {
  const { user, isLoading, isAuthenticated, getToken, signIn, signOut } =
    useAuth0();

  const history = useHistory();

  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  const onClickAccessToken = async (e: any) => {
    e.preventDefault();
    const token = await getToken();
    setAccessToken(token);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#202123',
        color: '#E7E9EC',
      }}
    >
      AppDeBug
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>isAuthenticated: {String(isAuthenticated)}</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <button type="button" onClick={() => signIn()}>
            signIn
          </button>
          <button type="button" onClick={() => signOut()}>
            signOut
          </button>
          <button type="button" onClick={onClickAccessToken}>
            getToken
          </button>
          <button
            type="button"
            onClick={async () => {
              if (!accessToken) {
                const token = await getToken();
                setAccessToken(token);
              }
              consoleLog(`-------accessToken-------`);
              consoleLog(accessToken);
              consoleLog(`-------accessToken-------`);
            }}
          >
            consoleToken
          </button>
        </div>
      </div>
      {isAuthenticated && (
        <div>
          {isAuthenticated ? (
            <pre>{JSON.stringify(user, null, 2)}</pre>
          ) : (
            'No user metadata defined'
          )}
        </div>
      )}
    </div>
  );
};
