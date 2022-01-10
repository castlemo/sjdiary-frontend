import styled from 'styled-components';

import { useCallback, useEffect, useRef, useState } from 'react';
import CheckButtonImg from '../../../assets/img/checkButton.png';
import CalendarButtonImg from '../../../assets/img/calendarButton.png';
import { Category, CreateTodo } from '../../../types';
import { HeaderTodoDetailModal } from '../modal';

const StyledMainHeaderWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const StyledCreateTodoInputWrapper = styled.div<{ isDetailModalOpen: boolean }>`
  width: 700px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: start;
  background: ${(p) => (p.isDetailModalOpen ? null : '#ffffff')};
  border: ${(p) => (p.isDetailModalOpen ? null : '0.5px solid #afafaf')};
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
  categories: Category[];
  SettingButtonImg: string;
  setCreateTodo: (value: React.SetStateAction<CreateTodo>) => void;
  submitCreateTodo: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

export const MainHeader = ({
  createTodo,
  categories,
  SettingButtonImg = '../../../assets/img/settingButton.png',
  setCreateTodo = () => {},
  submitCreateTodo = () => {},
}: PropTypes): JSX.Element => {
  const MainHeaderRef = useRef<HTMLDivElement>(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);

  const todoInputRef = useRef<HTMLDivElement>(null);

  const [modalTop, setModalTop] = useState<number>(0);

  const getThisRect = useCallback((): DOMRect | undefined => {
    if (!todoInputRef.current) return undefined;
    return todoInputRef.current.getBoundingClientRect();
  }, [todoInputRef]);

  return (
    <StyledMainHeaderWrapper ref={MainHeaderRef}>
      <StyledCreateTodoInputWrapper
        isDetailModalOpen={isDetailModalOpen}
        ref={todoInputRef}
      >
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
            const rect = getThisRect();
            if (rect) {
              setModalTop(rect.top);
            }
            setIsDetailModalOpen(!isDetailModalOpen);
          }}
        >
          <img
            style={{ width: 28, height: 28 }}
            src={CalendarButtonImg}
            alt="달력버튼"
          />
        </button>
      </StyledCreateTodoInputWrapper>
      {isDetailModalOpen ? (
        <HeaderTodoDetailModal
          createTodo={createTodo}
          modalTop={`${modalTop}px`}
          categories={categories}
          isDatePickerModalOpen={isDatePickerModalOpen}
          onCloseModal={() => {
            setIsDetailModalOpen(false);
            setIsDatePickerModalOpen(false);
          }}
          setCreateTodo={setCreateTodo}
          setIsDatePickerModalOpen={setIsDatePickerModalOpen}
          submitCreateTodo={submitCreateTodo}
        />
      ) : null}
      <button
        style={{
          border: 0,
          outline: 0,
          backgroundColor: '#00000000',
          cursor: 'pointer',
          marginRight: 20,
        }}
        type="button"
        onClick={() => {}}
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
