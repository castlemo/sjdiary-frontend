import { useState } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { MeOutput, TodoOutput } from '../../graphQL/types';
import {
  Agenda,
  DateCellWrapper,
  DayColumnWrapper,
  DayHeader,
  ToolBar,
  WeekEvent,
  WeekHeader,
} from '../organisms/calendar';

type PropTypes = {
  dataMe?: MeOutput;
  today: Date;
  setToday: React.Dispatch<React.SetStateAction<Date>>;
};

const now = new Date();

const year = now.getFullYear();
const month = now.getMonth();
const date = now.getDate();

const tempTodos: TodoOutput[] = [
  {
    id: 0,
    contents: '0번투두',
    startedAt: new Date(year, month, date, 0, 30),
    finishedAt: new Date(year, month, date, 1, 30),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 1,
    contents: '1번투두',
    startedAt: new Date(year, month, date, 1, 30),
    finishedAt: new Date(year, month, date, 2, 30),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    contents: '2번투두',
    startedAt: new Date(year, month, date, 2, 30),
    finishedAt: new Date(year, month, date, 3, 30),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    contents: '3번투두',
    startedAt: new Date(year, month, date, 3, 30),
    finishedAt: new Date(year, month, date, 4, 30),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 4,
    contents: '4번투두',
    startedAt: new Date(year, month, date, 4, 30),
    finishedAt: new Date(year, month, date, 5, 30),
    createdAt: now,
    updatedAt: now,
  },
];

const CalendarStyles: React.CSSProperties = {
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
};

export const MainTemplate = ({
  dataMe,
  today = new Date(),
  setToday = () => {},
}: PropTypes): JSX.Element => {
  const [todos, setTodos] = useState(tempTodos);

  moment.locale('ko-KR', {
    week: {
      dow: 1,
      doy: 1,
    },
  });
  const localizer = momentLocalizer(moment);

  return (
    <Calendar
      style={CalendarStyles}
      localizer={localizer}
      events={todos}
      formats={{
        timeGutterFormat: 'HH시',
      }}
      titleAccessor="contents"
      startAccessor="startedAt"
      endAccessor="finishedAt"
      defaultView="week"
      components={{
        dayColumnWrapper: DayColumnWrapper,
        dateCellWrapper: DateCellWrapper,
        toolbar: ToolBar({ dataMe }),
        // agenda: Agenda,
        week: {
          header: WeekHeader,
          // event: WeekEvent,
        },
        day: {
          header: DayHeader,
        },
      }}
    />
  );
};
