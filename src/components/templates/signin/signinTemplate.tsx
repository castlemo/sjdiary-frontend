import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { useAuth0 } from '../../../auth0';
import TiryLogo from '../../../assets/img/TiryLogo.png';
import { VERIFY_USER } from '../../../graphQL/queries';
import { LoadingPage } from '../../pages';

const StyledSigninTemplate = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* background-color: yellow; */
`;

export const SigninTemplate = () => {
  const { signIn, isAuthenticated } = useAuth0();
  const history = useHistory();

  if (isAuthenticated) {
    const {
      loading: loadingVerifyUser,
      // error: errorVerifyUser,
      data: verifyUserData,
    } = useQuery(VERIFY_USER, { fetchPolicy: 'network-only' });

    if (loadingVerifyUser) {
      return <LoadingPage isTransparency />;
    }

    const isUser = verifyUserData?.verifyUser;
    if (isUser === true) {
      history.push('/');
    } else if (isUser === false) {
      history.push('/signup');
    }
  }

  return (
    <StyledSigninTemplate>
      <img src={TiryLogo} alt="TiryLogo" width="480" height="333" />
      <span>version 0.0.1</span>
      <button
        style={{
          width: 299,
          height: 70,
          backgroundColor: '#D6CBFF',
          border: 0,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          marginTop: 58,
          padding: 0,
        }}
        onClick={signIn}
        type="button"
      >
        <p
          style={{
            fontWeight: 500,
            fontSize: 25,
            letterSpacing: -0.5,
            color: '#FFFFFF',
          }}
        >
          구글 계정으로 로그인하기
        </p>
      </button>
    </StyledSigninTemplate>
  );
};
