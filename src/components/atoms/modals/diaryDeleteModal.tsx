import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledDiaryDeleteModal = styled.div`
  position: absolute;

  width: 30%;
  height: 100%;
  right: 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.black2};
  box-shadow: 5px 5px 10px #000000;

  z-index: 2;

  cursor: pointer;
`;

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.colors.grey1};
`;

type PropTypes = {
  onClick: () => void;
  deleteItem: () => void;
};

export const DiaryDeleteModal = ({ onClick, deleteItem }: PropTypes) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClick();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <StyledDiaryDeleteModal onClick={() => deleteItem()} ref={ref}>
      <StyledSpan>삭제하기</StyledSpan>
    </StyledDiaryDeleteModal>
  );
};
