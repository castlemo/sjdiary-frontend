import styled from 'styled-components';
import { User } from '../../../types';

const StyledProfileHeader = styled.div`
  width: 420px;
  min-width: 420px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProfileHeader = ({ me }: { me?: User }) => {
  return (
    <StyledProfileHeader>
      <img
        style={{
          marginLeft: 30,
          marginRight: 30,
          borderRadius: 100,
          width: 60,
          height: 60,
        }}
        src={me?.profileImageUrl}
        alt="유저프로필이미지"
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
        }}
      >
        <span
          style={{
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: -0.5,
          }}
        >
          {me?.nickname ? me?.nickname : me?.name}
        </span>
        <span style={{ fontSize: 16, fontWeight: 300, letterSpacing: -0.5 }}>
          {me?.motto}
        </span>
      </div>
    </StyledProfileHeader>
  );
};
