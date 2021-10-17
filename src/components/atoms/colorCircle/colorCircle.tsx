import styled from 'styled-components';

interface PropTypes {
  width: number;
  height: number;
  borderRadius: number;
  backgroundColor: string;
}

export const ColorCircle = styled.div<PropTypes>`
  width: ${(p) => p.width}px;
  height: ${(p) => p.height}px;
  border-radius: ${(p) => p.borderRadius}px;
  background-color: ${(p) => p.backgroundColor};
`;
