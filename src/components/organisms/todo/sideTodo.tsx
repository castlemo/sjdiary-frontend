import styled from 'styled-components';
import TodoMenuButtonImg from '../../../assets/img/todoMenuButtonImg.png';
import { TodoPeriod } from '../../../types';

const StyledSideTodoWrapper = styled.div`
  min-height: 80px;
  display: flex;
  flex-direction: row;
  border-bottom: 0.5px solid #bfbfbf;
  margin-left: 20px;
`;

const StyledCheckButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 100px;
  border: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  cursor: pointer;
  margin-top: -20px;
`;

interface PropTypes {
  contents: string;
  isChecked?: boolean;
  period?: TodoPeriod;
}

export const SideTodo = ({
  contents = '',
  isChecked = false,
  period,
}: PropTypes) => {
  return (
    <StyledSideTodoWrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: 13,
          alignItems: 'center',
        }}
      >
        <StyledCheckButton type="button">
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 100,
              backgroundColor: '#FFFFFF',
            }}
          />
        </StyledCheckButton>
        <div
          style={{
            minWidth: 283,
            maxWidth: 283,
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 10,
          }}
        >
          <span
            style={{
              minHeight: 20,
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: 16,
              letterSpacing: -0.5,
            }}
          >
            {contents.length < 20
              ? contents
              : `${contents.substring(0, 19)}...`}
          </span>
          <span
            style={{
              marginTop: 6,
              minHeight: 20,
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: 16,
            }}
          >
            {!period ? '시간 미정' : 'test'}
          </span>
        </div>
        <button
          type="button"
          style={{
            width: 30,
            height: 30,
            border: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: '#ffffff',
          }}
        >
          <img src={TodoMenuButtonImg} alt="todoMenuImg" />
        </button>
      </div>
    </StyledSideTodoWrapper>
  );
};
