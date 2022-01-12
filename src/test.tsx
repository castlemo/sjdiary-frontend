import styled from 'styled-components';
import { useDrag } from 'react-dnd';

const StyledTestWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const mockItems = [...new Array(23).keys()];

const Knight = () => {
  return <span>♘</span>;
};

const Square = ({ black = true, children }: any) => {
  const fill = black ? 'black' : 'white';
  const stroke = black ? 'white' : 'black';

  return (
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
};

const renderSquare = (i: any, [knightX, knightY]: any) => {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const isKnightHere = x === knightX && y === knightY;
  const black = (x + y) % 2 === 1;
  const piece = isKnightHere ? <Knight /> : null;

  return (
    <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
      <Square black={black}>{piece}</Square>
    </div>
  );
};

const Board = ({ knightPosition }: any) => {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {squares}
    </div>
  );
};

export const Test = () => {
  return <Board knightPosition={[7, 4]} />;

  return (
    <StyledTestWrapper>
      <Square black>
        <Knight />
      </Square>
    </StyledTestWrapper>
  );
};
