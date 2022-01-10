import styled, { useTheme } from 'styled-components';

import { getWeek } from '../../../utils';
import { LeftArrowButton, RightArrowButton } from '../../../assets/img';
import { MeOutput } from '../../../graphQL/types';

const StyledHeaderWrapper = styled.header`
  width: 100%;
  height: 10%;
  min-height: 90px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLeftHeader = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  margin-left: 10px;
`;

const StyledRightHeader = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  margin-right: 40px;
`;

interface PropTypes {
  dataMe?: MeOutput;
  today: Date;
  onClickUpdateToday: (type: 'left' | 'right') => void;
}

export const MainHeader = ({
  dataMe,
  today,
  onClickUpdateToday = () => {},
}: PropTypes): JSX.Element => {
  const theme = useTheme();

  const month = today.getMonth() + 1;
  const week = getWeek(today);

  return (
    <StyledHeaderWrapper>
      <StyledLeftHeader>
        <LeftArrowButton
          style={{
            cursor: 'pointer',
            marginTop: 3,
          }}
          onClick={() => {
            onClickUpdateToday('left');
          }}
        />
        <span
          style={{
            fontSize: 30,
            color: theme.colors.white1,
          }}
        >
          {month}월 {week}째주
        </span>
        <RightArrowButton
          style={{
            cursor: 'pointer',
            marginTop: 3,
          }}
          onClick={() => {
            onClickUpdateToday('right');
          }}
        />
      </StyledLeftHeader>
      <StyledRightHeader>
        <span
          style={{
            textAlign: 'center',
            lineHeight: '40px',
            fontSize: 18,
            color: theme.colors.purple1,
            marginRight: 16,
          }}
        >
          오늘의 도달률 0%
        </span>
        <img
          style={{
            display: 'table-cell',
            width: 40,
            height: 40,
            borderRadius: 100,
          }}
          src={dataMe?.profileImageUrl}
          alt="프로필사진"
        />
      </StyledRightHeader>
    </StyledHeaderWrapper>
  );
};
