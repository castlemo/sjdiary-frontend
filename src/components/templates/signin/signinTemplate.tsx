import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { useAuth0 } from '../../../auth0';
import TiryLogo from '../../../assets/img/TiryLogo.png';

const StyledSigninTemplate = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* background-color: yellow; */
`;

export const SigninTemplate = () => {
  const history = useHistory();

  const {
    isLoading,
    getUserProfile,
    getToken,
    isAuthenticated,
    signIn,
    signOut,
    user,
  } = useAuth0();

  return (
    <StyledSigninTemplate>
      <img src={TiryLogo} alt="TiryLogo" width="480" height="333" />
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
