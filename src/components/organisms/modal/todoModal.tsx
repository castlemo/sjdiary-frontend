/* eslint-disable no-nested-ternary */
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
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

const StyledTimeInput = styled.input`
  width: 22px;
  height: 23px;
  font-size: 18px;
  color: #ab88f4;
  text-decoration-line: underline;
  border: 0px;
  font-family: Spoqa Han Sans Neo;
  margin: 0px;
  padding: 0px;
  outline: 0px;
`;

interface PropTypes {
  todo: UpdateTodo;
  modalType: 'UPDATE' | 'CREATE';
  modalTop: string;
  modalLeft: string;
  categories?: Category[];
  isDatePickerModalOpen: boolean;
  onCloseModal: (options?: { isAll: boolean }) => void;
  setUpdateTodo: (value: React.SetStateAction<UpdateTodo>) => void;
  setIsDatePickerModalOpen: (v: boolean) => void;
  submitUpdateTodo: () => void;
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
  submitUpdateTodo,
}: PropTypes): JSX.Element => {
  const now = new Date();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      // 현재 document에서 mousedown 이벤트가 동작하면 호출되는 함수입니다.
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCloseModal();
      }
    }

    // 현재 document에 이벤트리스너를 추가합니다.
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const [tempStartDate, setTempStartDate] = useState<{
    hours: number | undefined;
    minutes: number | undefined;
  }>({
    hours: undefined,
    minutes: undefined,
  });

  const [tempEndDate, setTempEndDate] = useState<{
    hours: number | undefined;
    minutes: number | undefined;
  }>({
    hours: undefined,
    minutes: undefined,
  });

  // 카테고리 설정 메뉴 오픈 여부
  const [isCategorySettingMenuOpen, setIsCategorySettingMenuOpen] =
    useState<boolean>(false);

  // 카테고리 설정 wrapper Ref
  const categorySettingRef = useRef<HTMLDivElement>(null);

  // 시간 설정 여부
  const [isTimeSetting, setIsTimeSetting] = useState<boolean>(false);

  // 시작시간 OR 종료시간
  const [isStartDate, setIsStartDate] = useState(true);

  // 시작 시간 Date
  const [checkedStartDate, setCheckedStartDate] = useState<{
    year: number;
    month: number;
    date: number;
    hours: number;
    minutes: number;
  }>({
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
  });

  // 종료 시간 Date
  const [checkedEndDate, setCheckedEndDate] = useState<{
    year: number;
    month: number;
    date: number;
    hours: number;
    minutes: number;
  }>({
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
  });

  useEffect(() => {
    const startedAt = isTimeSetting
      ? new Date(
          checkedStartDate.year,
          checkedStartDate.month,
          checkedStartDate.date,
          checkedStartDate.hours,
          checkedStartDate.minutes,
        )
      : new Date(
          checkedStartDate.year,
          checkedStartDate.month,
          checkedStartDate.date,
        );
    const endedAt = isTimeSetting
      ? new Date(
          checkedEndDate.year,
          checkedEndDate.month,
          checkedEndDate.date,
          checkedEndDate.hours,
          checkedEndDate.minutes,
        )
      : new Date(
          checkedEndDate.year,
          checkedEndDate.month,
          checkedEndDate.date,
        );
    setUpdateTodo({
      ...todo,
      TodoPeriod: {
        ...todo.TodoPeriod,
        isTime: isTimeSetting,
        startedAt,
        endedAt,
      },
    });
  }, [
    checkedStartDate,
    checkedEndDate,
    setCheckedStartDate,
    setCheckedEndDate,
  ]);

  const onLeftButtonClick = () => {
    onCloseModal({ isAll: true });
  };

  const onRightButtonClick = () => {
    submitUpdateTodo();
    onCloseModal({ isAll: true });
  };

  return (
    <StyledTodoModalWrapper top={modalTop} left={modalLeft} ref={modalRef}>
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
            setUpdateTodo({
              ...todo,
              contents: value,
            });
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
            marginRight: 20,
          }}
          ref={categorySettingRef}
        >
          <button
            type="button"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
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
            <span
              style={{
                marginLeft: 10,
                fontSize: 18,
                color: todo.Category?.color || '#D4D4D4',
                fontFamily: 'Spoqa Han Sans Neo',
              }}
            >
              {todo.Category?.name ?? '카테고리 미정'}
            </span>
          </button>
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
              setIsTimeSetting(!isTimeSetting);
            }}
          >
            <img
              src={isTimeSetting ? CircleCheckGreyImg : CircleCheckPurpleImg}
              alt={isTimeSetting ? 'TimeNotCheckImg' : 'TimeCheckImg'}
            />
            <span
              style={{
                marginLeft: 10,
                fontSize: 18,
                color: isTimeSetting ? '#D4D4D4' : '#AB88F4',
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
                {checkedStartDate.year}/
                {checkedStartDate.month + 1 < 10
                  ? `0${checkedStartDate.month + 1}`
                  : checkedStartDate.month + 1}
                /
                {checkedStartDate.date < 10
                  ? `0${checkedStartDate.date}`
                  : checkedStartDate.date}
              </StyledSpan>
            </button>
            {!isTimeSetting ? (
              <StyledSpan>
                {checkedStartDate.hours < 10
                  ? `0${checkedStartDate.hours}`
                  : checkedStartDate.hours}
                :
                {checkedStartDate.minutes < 10
                  ? `0${checkedStartDate.minutes}`
                  : checkedStartDate.minutes}
              </StyledSpan>
            ) : (
              <div
                style={{
                  height: 23,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#AB88F4',
                }}
              >
                <StyledTimeInput
                  maxLength={2}
                  value={
                    tempStartDate?.hours !== undefined
                      ? tempStartDate.hours
                      : checkedStartDate.hours < 10
                      ? `0${checkedStartDate.hours}`
                      : checkedStartDate.hours
                  }
                  onBlur={() => {
                    if (tempStartDate?.hours) {
                      setCheckedStartDate({
                        ...checkedStartDate,
                        hours: tempStartDate.hours,
                      });
                    }
                    setTempStartDate({ hours: undefined, minutes: undefined });
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const hours = Number(e.target.value);
                    if (!Number.isNaN(hours)) {
                      if (hours < 24) {
                        setTempStartDate({ hours, minutes: undefined });
                      } else {
                        window.alert('시간은 23시까지 설정가능합니다.');
                        setTempStartDate({ hours: 0, minutes: undefined });
                      }
                    }
                  }}
                />
                :
                <StyledTimeInput
                  value={
                    tempStartDate.minutes !== undefined
                      ? tempStartDate.minutes
                      : checkedStartDate.minutes < 10
                      ? `0${checkedStartDate.minutes}`
                      : checkedStartDate.minutes
                  }
                  onBlur={() => {
                    if (tempStartDate.minutes) {
                      setCheckedStartDate({
                        ...checkedStartDate,
                        minutes: tempStartDate.minutes,
                      });
                    }
                    setTempStartDate({ hours: undefined, minutes: undefined });
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const minutes = Number(e.target.value);
                    if (!Number.isNaN(minutes)) {
                      if (minutes < 60) {
                        setTempStartDate({ minutes, hours: undefined });
                      } else {
                        window.alert('분은 59분까지 설정가능합니다.');
                        setTempStartDate({ minutes: 0, hours: undefined });
                      }
                    }
                  }}
                />
              </div>
            )}
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
              onClick={() => {
                setIsDatePickerModalOpen(true);
                setIsStartDate(false);
              }}
            >
              <StyledSpan style={{ marginRight: 10 }}>
                {checkedEndDate.year}/
                {checkedEndDate.month + 1 < 10
                  ? `0${checkedEndDate.month + 1}`
                  : checkedEndDate.month + 1}
                /
                {checkedEndDate.date < 10
                  ? `0${checkedEndDate.date}`
                  : checkedEndDate.date}
              </StyledSpan>
            </button>
            {!isTimeSetting ? (
              <StyledSpan>
                {checkedEndDate.hours < 10
                  ? `0${checkedEndDate.hours}`
                  : checkedEndDate.hours}
                :
                {checkedEndDate.minutes < 10
                  ? `0${checkedEndDate.minutes}`
                  : checkedEndDate.minutes}
              </StyledSpan>
            ) : (
              <div
                style={{
                  height: 23,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#AB88F4',
                }}
              >
                <StyledTimeInput
                  maxLength={2}
                  value={
                    tempEndDate?.hours !== undefined
                      ? tempEndDate.hours
                      : checkedEndDate.hours < 10
                      ? `0${checkedEndDate.hours}`
                      : checkedEndDate.hours
                  }
                  onBlur={() => {
                    if (tempEndDate?.hours) {
                      setCheckedEndDate({
                        ...checkedEndDate,
                        hours: tempEndDate.hours,
                      });
                    }
                    setTempEndDate({ hours: undefined, minutes: undefined });
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const hours = Number(e.target.value);
                    if (!Number.isNaN(hours)) {
                      if (hours < 24) {
                        setTempEndDate({ hours, minutes: undefined });
                      } else {
                        window.alert('시간은 23시까지 설정가능합니다.');
                        setTempEndDate({ hours: 0, minutes: undefined });
                      }
                    }
                  }}
                />
                :
                <StyledTimeInput
                  value={
                    tempEndDate.minutes !== undefined
                      ? tempEndDate.minutes
                      : checkedEndDate.minutes < 10
                      ? `0${checkedEndDate.minutes}`
                      : checkedEndDate.minutes
                  }
                  onBlur={() => {
                    if (tempEndDate.minutes) {
                      setCheckedEndDate({
                        ...checkedEndDate,
                        minutes: tempEndDate.minutes,
                      });
                    }
                    setTempEndDate({ hours: undefined, minutes: undefined });
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const minutes = Number(e.target.value);
                    if (!Number.isNaN(minutes)) {
                      if (minutes < 60) {
                        setTempEndDate({ minutes, hours: undefined });
                      } else {
                        window.alert('분은 59분까지 설정가능합니다.');
                        setTempEndDate({ minutes: 0, hours: undefined });
                      }
                    }
                  }}
                />
              </div>
            )}
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
