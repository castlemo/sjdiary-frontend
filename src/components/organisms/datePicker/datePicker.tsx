/* eslint-disable no-plusplus */
/* eslint-disable for-direction */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { ImageButton } from '../../atoms';
import LeftArrowImage from '../../../assets/img/leftArrow.png';
import RightArrowImage from '../../../assets/img/rightArrow.png';
import { DAYS } from '../../../constant';

const StyledDatePickerWrapper = styled.div<{ top: number; left: number }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: white;

  width: 322px;
  min-width: 322px;
  height: 298px;
  min-height: 298px;
  max-height: 298px;
  top: ${(p) => p.top}px;
  left: ${(p) => p.left}px;
  border-radius: 10px;

  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25));
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
`;

const StyledBody = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledCalendarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  margin: 0px;
  padding: 0px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  row-gap: 0px;
  column-gap: 0px;
`;

const StyledDayItem = styled.div`
  font-size: 16px;
  color: #0000004d;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDateItem = styled.button`
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #e4e4e4;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  cursor: pointer;
  font-size: 18px;
`;

interface PropTypes {
  checkedDate: {
    year: number;
    month: number;
    date: number;
    hours: number;
    minutes: number;
  };
  setCheckedDate: (value: {
    year: number;
    month: number;
    date: number;
    hours: number;
    minutes: number;
  }) => void;
  top: number;
  left: number;
  closeModal: () => void;
}

export const DatePicker = ({
  checkedDate,
  top,
  left,
  setCheckedDate,
  closeModal,
}: PropTypes) => {
  const [today, setToday] = useState(new Date());

  const nowYear = today.getFullYear();
  const nowMonth = today.getMonth();

  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      // 현재 document에서 mousedown 이벤트가 동작하면 호출되는 함수입니다.
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        closeModal();
      }
    }

    // 현재 document에 이벤트리스너를 추가합니다.
    document.addEventListener('mousedown', handleClickOutside);

    // useEffect 함수가 return하는 것은 마운트 해제하는 것과 동일합니다.
    // 즉, Class 컴포넌트의 componentWillUnmount 생명주기와 동일합니다.
    // 더 이상'mousedown'이벤트가 동작하더라도 handleClickOutside 함수가 실행되지 않습니다.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [datePickerRef]); // ref가 변경되면 useEffect를 다시 생성합니다.

  const dateList = useMemo<
    Array<{ year: number; month: number; date: number }>
  >(() => {
    const previousMonthDateObj = new Date(nowYear, nowMonth, 0);
    const previousMonthYear = previousMonthDateObj.getFullYear();
    const previousMonth = previousMonthDateObj.getMonth();
    const previousMonthLastDate = previousMonthDateObj.getDate();

    const nowMonthFirstDay = new Date(nowYear, nowMonth, 1).getDay();
    const nowMonthLastDate = new Date(nowYear, nowMonth + 1, 0).getDate();
    const nowMonthLastDay = new Date(nowYear, nowMonth + 1, 0).getDay();

    const previousDateList: { year: number; month: number; date: number }[] =
      [];
    for (
      let i = previousMonthLastDate;
      i > previousMonthLastDate - nowMonthFirstDay;
      i--
    ) {
      previousDateList.unshift({
        year: previousMonthYear,
        month: previousMonth,
        date: i,
      });
    }

    const nowMonthDateList = [...Array(nowMonthLastDate).keys()];

    const nextMonthDateObj = new Date(nowYear, nowMonth + 1, 1);
    const nextMonthYear = nextMonthDateObj.getFullYear();
    const nextMonth = nextMonthDateObj.getMonth();

    const nextMonthDateList = [];

    for (let i = 0; i < 6 - nowMonthLastDay; i++) {
      nextMonthDateList.push({
        year: nextMonthYear,
        month: nextMonth,
        date: i + 1,
      });
    }

    return previousDateList.sort().concat(
      ...nowMonthDateList
        .map((date) => ({
          year: nowYear,
          month: nowMonth,
          date: date + 1,
        }))
        .concat(nextMonthDateList),
    );
  }, [today]);

  return (
    <StyledDatePickerWrapper top={top} left={left} ref={datePickerRef}>
      <StyledHeader>
        <ImageButton
          buttonStyle={{
            width: 30,
            height: 30,
            marginRight: 30,
            cursor: 'pointer',
          }}
          imgSrc={LeftArrowImage}
          imgAlt="LeftArrow"
          imageStyle={{}}
          onClick={() => {
            setToday(
              new Date(
                today.getFullYear(),
                today.getMonth() - 1,
                today.getDate(),
              ),
            );
          }}
        />
        <span
          style={{
            fontSize: 16,
          }}
        >
          {nowYear}/{nowMonth + 1 < 10 ? `0${nowMonth + 1}` : nowMonth + 1}
        </span>
        <ImageButton
          buttonStyle={{
            width: 30,
            height: 30,
            marginLeft: 15,
            cursor: 'pointer',
          }}
          imgSrc={RightArrowImage}
          imgAlt="RightArrow"
          imageStyle={{}}
          onClick={() => {
            setToday(
              new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                today.getDate(),
              ),
            );
          }}
        />
      </StyledHeader>
      <StyledBody>
        <StyledCalendarContainer>
          {DAYS.map((value) => (
            <StyledDayItem key={value}>{value}</StyledDayItem>
          ))}
          {[...dateList].map((v) => {
            const isNowMonth = v.year === nowYear && v.month === nowMonth;

            const isCheckedDate =
              v.date === checkedDate?.date &&
              v.year === checkedDate?.year &&
              v.month === checkedDate?.month;

            const style: React.CSSProperties = {
              // eslint-disable-next-line no-nested-ternary
              color: !isNowMonth
                ? '#0000004D'
                : isCheckedDate
                ? '#AB88F4'
                : undefined,
              background: isCheckedDate ? '#F1EDFF' : '#ffffff',
            };

            return (
              <StyledDateItem
                key={`${v.year}/${v.month}/${v.date}`}
                style={style}
                onClick={() => {
                  if (!isNowMonth) {
                    setToday(new Date(v.year, v.month, v.date));
                    return;
                  }

                  setCheckedDate({
                    year: v.year,
                    month: v.month,
                    date: v.date,
                    hours: checkedDate?.hours,
                    minutes: checkedDate?.minutes,
                  });
                }}
              >
                {v.date}
              </StyledDateItem>
            );
          })}
        </StyledCalendarContainer>
      </StyledBody>
    </StyledDatePickerWrapper>
  );
};
