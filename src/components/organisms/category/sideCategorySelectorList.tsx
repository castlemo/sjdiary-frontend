import styled from 'styled-components';
import { Category, GetTodosType } from '../../../types';
import { ColorCircle } from '../../atoms';

const StyledSideCategorySelectorListWrapper = styled.div`
  width: 90%;
  height: 5%;
  min-height: 44px;
  margin-top: 23px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-y: hidden;
  overflow-x: auto;

  /* scroll styling */
  ::-webkit-scrollbar {
    height: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6c2ff;
  }

  ::-webkit-scrollbar-track {
    background-color: #bfbfbf;
  }
  /* fireFox scroll style*/
  scrollbar-width: thin;
  scrollbar-color: #d6c2ff #bfbfbf;
`;

interface PropTypes {
  categoryScrollRef: React.RefObject<HTMLDivElement> | null;
  SettingButtonImg: string;
  categories: Category[] | undefined;
  onCloseModal: () => void;
  categoryScrollHandler: (e: React.UIEvent<HTMLDivElement>) => void;
  setIsCategorySettingOpen: (value: React.SetStateAction<boolean>) => void;
  setSelectCategoryId: (
    value: React.SetStateAction<number | undefined>,
  ) => void;
  setGetTodosType: (value: React.SetStateAction<GetTodosType>) => void;
}

export const SideCategorySelectorList = ({
  categoryScrollRef = null,
  SettingButtonImg = '../../../assets/img/settingButton.png',
  categories = [],
  onCloseModal = () => {},
  categoryScrollHandler = () => {},
  setIsCategorySettingOpen = () => {},
  setSelectCategoryId = () => {},
  setGetTodosType = () => {},
}: PropTypes): JSX.Element => {
  return (
    <StyledSideCategorySelectorListWrapper
      ref={categoryScrollRef}
      onScroll={categoryScrollHandler}
      onMouseDown={onCloseModal}
    >
      <button
        key="settingImg"
        style={{
          width: 30,
          height: 30,
          marginLeft: 20,
          border: 0,
          cursor: 'pointer',
          outline: 0,
          backgroundColor: '#00000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        type="button"
        onClick={() => {
          setIsCategorySettingOpen(true);
        }}
      >
        <img
          style={{ width: 30, height: 30 }}
          src={SettingButtonImg}
          alt="카테고리셋팅버튼"
        />
      </button>
      <button
        key="all"
        style={{
          width: 30,
          height: 30,
          marginLeft: 30,
          border: 0,
          cursor: 'pointer',
          outline: 0,
          backgroundColor: '#00000000',
          fontWeight: 500,
          fontSize: 20,
          color: '#8E8E8E',
        }}
        type="button"
        onClick={() => {
          setGetTodosType('ALL');
          setSelectCategoryId(undefined);
        }}
      >
        all
      </button>
      {categories?.map((category) => {
        return (
          <button
            key={category.id}
            style={{
              width: 30,
              height: 30,
              marginLeft: 30,
              border: 0,
              cursor: 'pointer',
              outline: 0,
              backgroundColor: '#00000000',
              fontWeight: 500,
              fontSize: 20,
              color: '#8E8E8E',
            }}
            type="button"
            onClick={() => {
              setGetTodosType('CATEGORY');
              setSelectCategoryId(Number(category.id));
            }}
          >
            <ColorCircle
              width={20}
              height={20}
              borderRadius={100}
              backgroundColor={category.color}
            />
          </button>
        );
      })}
    </StyledSideCategorySelectorListWrapper>
  );
};
