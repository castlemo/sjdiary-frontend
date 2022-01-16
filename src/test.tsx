import styled from 'styled-components';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const StyledTestWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const TestStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
};

const tempData = [
  {
    id: 0,
    contents: '0',
    startedAt: new Date(),
    finishedAt: new Date(),
  },
  {
    id: 1,
    contents: '1',
    startedAt: new Date(),
    finishedAt: new Date(),
  },
  {
    id: 2,
    contents: '2',
    startedAt: new Date(),
    finishedAt: new Date(),
  },
  {
    id: 3,
    contents: '3',
    startedAt: new Date(),
    finishedAt: new Date(),
  },
];

const Toolbar = (props: any) => {
  const { date, onNavigate } = props;

  console.log(props);

  const navigate = (action: 'TODAY' | 'PREV' | 'NEXT') => {
    onNavigate(action);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button
          type="button"
          onClick={() => {
            navigate('TODAY');
          }}
        >
          이번달
        </button>
        <button
          type="button"
          onClick={() => {
            navigate('PREV');
          }}
        >
          이전
        </button>
        <span className="rbc-toolbar-label">{`${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월`}</span>
        <button
          type="button"
          onClick={() => {
            navigate('NEXT');
          }}
        >
          다음
        </button>
      </span>
    </div>
  );
};

export const Test = () => {
  moment.locale('en-GB', {
    week: {
      dow: 1,
      doy: 1,
    },
  });
  const localizer = momentLocalizer(moment);

  return (
    <Calendar
      localizer={localizer}
      events={tempData}
      formats={{
        timeGutterFormat: 'HH시',
      }}
      style={TestStyle}
      titleAccessor="contents"
      startAccessor="startedAt"
      endAccessor="finishedAt"
      defaultView="week"
      components={{
        toolbar: Toolbar,
      }}
    />
  );
};
