import styled from 'styled-components';

import { MeOutput } from '../../graphQL/types';
import { MainHeader } from '../organisms';

const StyledMainTemplate = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

const StyledBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  background-color: pink;
`;

interface PropTypes {
  dataMe?: MeOutput;
  today: Date;
  onClickUpdateToday: (type: 'left' | 'right') => void;
}

export const MainTemplate = ({
  dataMe,
  today = new Date(),
  onClickUpdateToday = () => {},
}: PropTypes): JSX.Element => {
  return (
    <StyledMainTemplate>
      <MainHeader
        dataMe={dataMe}
        today={today}
        onClickUpdateToday={onClickUpdateToday}
      />
      <StyledBody>
        <span>body</span>
      </StyledBody>
    </StyledMainTemplate>
  );
};
