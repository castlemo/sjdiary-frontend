import styled from 'styled-components';

import CheckButtonImg from '../../../assets/img/checkButton.png';
import CalendarButtonImg from '../../../assets/img/calendarButton.png';
import { CreateTodo } from '../../../types';
import { consoleLog } from '../../../utils';

const StyledMainHeaderWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const StyledCreateTodoInputWrapper = styled.div`
  width: 700px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: start;
  background: #ffffff;
  border: 0.5px solid #afafaf;
  box-sizing: border-box;
  border-radius: 100px;
  padding: 13px 0px 12px 20px;
  font-weight: 300;
  font-size: 20px;
`;

const StyledInput = styled.input`
  width: 85%;
  border: 0;
  font-weight: 300;
  font-size: 20px;
  outline: none;
`;

interface PropTypes {
  createTodo: CreateTodo;
  SettingButtonImg: string;
  setCreateTodo: (value: React.SetStateAction<CreateTodo>) => void;
  submitCreateTodo: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

export const MainHeader = ({
  createTodo,
  SettingButtonImg = '../../../assets/img/settingButton.png',
  setCreateTodo = () => {},
  submitCreateTodo = () => {},
}: PropTypes): JSX.Element => {
  return (
    <StyledMainHeaderWrapper>
      <StyledCreateTodoInputWrapper>
        <StyledInput
          name="contents"
          placeholder="내가 해야될 일은?"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setCreateTodo({ ...createTodo, [name]: value });
          }}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              submitCreateTodo();
            }
          }}
          value={createTodo.contents}
        />
        <button
          style={{
            border: 0,
            outline: 0,
            backgroundColor: '#00000000',
            cursor: 'pointer',
          }}
          type="button"
          onClick={submitCreateTodo}
        >
          <img
            style={{ width: 28, height: 28 }}
            src={CheckButtonImg}
            alt="체크버튼"
          />
        </button>
        <button
          style={{
            border: 0,
            outline: 0,
            backgroundColor: '#00000000',
            cursor: 'pointer',
          }}
          type="button"
          onClick={() => {
            consoleLog('calendar');
          }}
        >
          <img
            style={{ width: 28, height: 28 }}
            src={CalendarButtonImg}
            alt="달력버튼"
          />
        </button>
      </StyledCreateTodoInputWrapper>
      <button
        style={{
          border: 0,
          outline: 0,
          backgroundColor: '#00000000',
          cursor: 'pointer',
          marginRight: 20,
        }}
        type="button"
        onClick={() => {
          consoleLog('profile setting');
        }}
      >
        <img
          style={{ width: 40, height: 40 }}
          src={SettingButtonImg}
          alt="셋팅버튼"
        />
      </button>
    </StyledMainHeaderWrapper>
  );
};
