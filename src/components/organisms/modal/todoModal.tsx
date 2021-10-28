/* eslint-disable no-nested-ternary */
import { useRef, useState } from 'react';
import styled from 'styled-components';

import CircleCheckPurpleImg from '../../../assets/img/circleCheckPurpleImg.png';
import CircleCheckGreyImg from '../../../assets/img/circleCheckGreyImg.png';
import { Category, CreateTodo, UpdateTodo } from '../../../types';
import { ColorCircle } from '../../atoms';
import { CategorySelectMenu } from '../menus';
import { DatePicker } from '../datePicker';

const StyledTodoModalWrapper = styled.div<{ top: string; left: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 403px;
  height: 423px;
  top: ${(p) => p.top};
  left: ${(p) => p.left};
  border-radius: 10px;
  background-color: #ffffff;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25));
`;

const StyledTimeSettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 133px;
  margin-top: 15px;
  border: 0.5px solid #afafaf;
  box-sizing: border-box;
  border-radius: 25px;
  background-color: #ffffff;
`;

const StyledSpan = styled.span`
  font-size: 18px;
  color: #868686;
  font-family: Spoqa Han Sans Neo;
`;

interface PropTypes {
  todo: UpdateTodo | CreateTodo;
  modalType: 'UPDATE' | 'CREATE';
  modalTop: string;
  modalLeft: string;
  categories?: Category[];
  isDatePickerModalOpen: boolean;
  onCloseModal: () => void;
  setUpdateTodo: (value: React.SetStateAction<UpdateTodo>) => void;
  setIsDatePickerModalOpen: (v: boolean) => void;
}

export const TodoModal = ({
  todo,
  modalType,
  modalTop,
  modalLeft,
  categories = [],
  isDatePickerModalOpen = false,
  onCloseModal,
  setUpdateTodo,
  setIsDatePickerModalOpen,
}: PropTypes): JSX.Element => {
  const [today, setToday] = useState(new Date());

  // 카테고리 설정 메뉴 오픈 여부
  const [isCategorySettingMenuOpen, setIsCategorySettingMenuOpen] =
    useState<boolean>(false);

  // 카테고리 설정 wrapper Ref
  const categorySettingRef = useRef<HTMLDivElement>(null);

  // 시간 설정 여부
  const [isTime, setIsTime] = useState<boolean>(false);

  const [isStartDate, setIsStartDate] = useState(true);

  const startDateRef = useRef<HTMLDivElement>(null);
  const endDateRef = useRef<HTMLButtonElement>(null);

  const [datePickerModalTop, SetDatePickerModalTop] = useState(0);
  const [datePickerModalLeft, SetDatePickerModalLeft] = useState(0);

  // 시작 시간 Date
  const [checkedStartDate, setCheckedStartDate] = useState<
    | {
        year: number;
        month: number;
        date: number;
      }
    | undefined
  >(undefined);

  // 종료 시간 Date
  const [checkedEndDate, setCheckedEndDate] = useState<
    | {
        year: number;
        month: number;
        date: number;
      }
    | undefined
  >(undefined);

  const onLeftButtonClick = () => {
    onCloseModal();
  };

  const onRightButtonClick = () => {
    onCloseModal();
  };

  return (
    <StyledTodoModalWrapper top={modalTop} left={modalLeft} ref={startDateRef}>
      <span
        style={{
          display: 'flex',
          width: '95%',
          fontSize: 20,
          marginTop: 20,
          marginLeft: 20,
        }}
      >
        {modalType === 'CREATE' ? '새로운 할 일 만들기' : '할 일 수정하기'}
      </span>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          height: 50,
          marginTop: 15,
          border: '0.5px solid #AFAFAF',
          boxSizing: 'border-box',
          borderRadius: 20,
          backgroundColor: '#ffffff',
        }}
      >
        <input
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            border: 0,
            fontSize: 20,
            outline: 0,
          }}
          value={todo.contents}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            if (Object.keys(todo).includes('id')) {
              setUpdateTodo({
                id: (todo as UpdateTodo).id,
                ...todo,
                contents: value,
              });
            }
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          height: 50,
          marginTop: 15,
          border: isCategorySettingMenuOpen ? undefined : '0.5px solid #AFAFAF',
          boxSizing: 'border-box',
          borderRadius: isCategorySettingMenuOpen ? undefined : 20,
          backgroundColor: isCategorySettingMenuOpen ? undefined : '#ffffff',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: 18,
            marginLeft: 20,
          }}
        >
          카테고리 설정
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          ref={categorySettingRef}
        >
          <button
            type="button"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              border: 0,
              cursor: 'pointer',
            }}
            onClick={() => {
              setIsCategorySettingMenuOpen(true);
            }}
          >
            <ColorCircle
              width={20}
              height={20}
              borderRadius={100}
              backgroundColor={todo.Category?.color || '#ffffff'}
              style={{ border: '1px solid #d6c2ff' }}
            />
          </button>
          <span
            style={{
              marginLeft: 10,
              marginRight: 20,
              fontSize: 18,
              color: todo.Category?.color || '#D4D4D4',
            }}
          >
            {todo.Category?.name ?? '카테고리 미정'}
          </span>
        </div>
      </div>
      {isCategorySettingMenuOpen ? (
        <CategorySelectMenu
          categories={categories}
          setUpdateTodo={setUpdateTodo}
          todo={todo}
          onCloseMenu={() => {
            setIsCategorySettingMenuOpen(false);
          }}
        />
      ) : null}
      <StyledTimeSettingWrapper>
        <div
          style={{
            display: 'flex',
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 14,
          }}
        >
          <span
            style={{
              fontSize: 18,
            }}
          >
            시간 설정
          </span>
          <button
            type="button"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              border: 0,
              backgroundColor: '#FFFFFF',
            }}
            onClick={() => {
              setIsTime(!isTime);
            }}
          >
            <img
              src={isTime ? CircleCheckPurpleImg : CircleCheckGreyImg}
              alt={isTime ? 'TimeCheckImg' : 'TimeNotCheckImg'}
            />
            <span
              style={{
                marginLeft: 10,
                fontSize: 18,
                color: isTime ? '#AB88F4' : '#D4D4D4',
              }}
            >
              시간 미정
            </span>
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <StyledSpan>시작 시간</StyledSpan>
          <div
            style={{
              display: 'flex',
              width: '55%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              style={{
                border: 0,
                backgroundColor: '#ffffff',
                cursor: 'pointer',
              }}
              onClick={() => {
                setIsDatePickerModalOpen(true);
                setIsStartDate(true);
              }}
            >
              <StyledSpan style={{ marginRight: 10 }}>
                {checkedStartDate?.year ?? today.getFullYear()}/
                {checkedStartDate
                  ? checkedStartDate?.month + 1 < 10
                    ? `0${checkedStartDate?.month + 1}`
                    : checkedStartDate?.month + 1
                  : today.getMonth() + 1 < 10
                  ? `0${today.getMonth() + 1}`
                  : today.getMonth() + 1}
                /
                {checkedStartDate
                  ? checkedStartDate?.date < 10
                    ? `0${checkedStartDate?.date}`
                    : checkedStartDate?.date
                  : today.getDate() < 10
                  ? `0${today.getDate()}`
                  : today.getDate()}
              </StyledSpan>
            </button>
            <StyledSpan>
              {today.getHours() < 10
                ? `0${today.getHours()}`
                : today.getHours()}
              :
              {today.getMinutes() < 10
                ? `0${today.getMinutes()}`
                : today.getMinutes()}
            </StyledSpan>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <StyledSpan>종료 시간</StyledSpan>
          <div
            style={{
              display: 'flex',
              width: '55%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              style={{
                border: 0,
                backgroundColor: '#ffffff',
                cursor: 'pointer',
              }}
              ref={endDateRef}
              onClick={() => {
                setIsDatePickerModalOpen(true);
                setIsStartDate(false);
              }}
            >
              <StyledSpan style={{ marginRight: 10 }}>
                {checkedEndDate?.year ?? today.getFullYear()}/
                {checkedEndDate
                  ? checkedEndDate?.month + 1 < 10
                    ? `0${checkedEndDate?.month + 1}`
                    : checkedEndDate?.month + 1
                  : today.getMonth() + 1 < 10
                  ? `0${today.getMonth() + 1}`
                  : today.getMonth() + 1}
                /
                {checkedEndDate
                  ? checkedEndDate?.date < 10
                    ? `0${checkedEndDate?.date}`
                    : checkedEndDate?.date
                  : today.getDate() < 10
                  ? `0${today.getDate()}`
                  : today.getDate()}
              </StyledSpan>
            </button>
            <StyledSpan>
              {today.getHours() < 10
                ? `0${today.getHours()}`
                : today.getHours()}
              :
              {today.getMinutes() < 10
                ? `0${today.getMinutes()}`
                : today.getMinutes()}
            </StyledSpan>
          </div>
        </div>
        {isDatePickerModalOpen ? (
          <DatePicker
            checkedDate={isStartDate ? checkedStartDate : checkedEndDate}
            top={125}
            left={403}
            setCheckedDate={
              isStartDate ? setCheckedStartDate : setCheckedEndDate
            }
            closeModal={() => setIsDatePickerModalOpen(false)}
          />
        ) : null}
      </StyledTimeSettingWrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '90%',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <button
          type="button"
          style={{
            border: 0,
            width: 170,
            height: 50,
            borderRadius: 100,
            backgroundColor: '#F9F9F9',
            cursor: 'pointer',
            fontSize: 20,
            color: '#BFBFBF',
          }}
          onClick={onLeftButtonClick}
        >
          {modalType === 'CREATE' ? '취소하기' : '삭제하기'}
        </button>
        <button
          type="button"
          style={{
            border: 0,
            width: 170,
            height: 50,
            borderRadius: 100,
            backgroundColor: '#F1EDFF',
            cursor: 'pointer',
            fontSize: 20,
            color: '#AB88F4',
          }}
          onClick={onRightButtonClick}
        >
          {modalType === 'CREATE' ? '만들기' : '완료'}
        </button>
      </div>
    </StyledTodoModalWrapper>
  );
};
