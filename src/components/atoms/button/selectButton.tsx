import styled from 'styled-components';

interface StyledSelectButtonProps {
  isCheck?: boolean;
}

export const SelectButton = styled.div<StyledSelectButtonProps>`
  width: 188px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => (p.isCheck ? '#d6cbff' : null)};
  border-radius: 100px;
  color: ${(p) => (p.isCheck ? '#ffffff' : '#d6c2ff')};
`;
