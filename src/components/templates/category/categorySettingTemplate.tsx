import { useRef, useState } from 'react';
import styled from 'styled-components';

import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { useMutation } from '@apollo/client';
import { Category, CreateCategory } from '../../../types';
import { CategoryCard } from '../../molecules';
import { useTiryTheme } from '../../../styles/theme';
import CheckButtonImg from '../../../assets/img/checkButton.png';
import { CREATE_CATEGORY } from '../../../graphQL/mutations';
import { LoadingPage } from '../../pages';

const StyledCategorySettingTemplate = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  width: 420px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d6cbff;
  left: 0px;
  bottom: 0px;
  border: 0;
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;

const StyledCategoryList = styled.div`
  display: flex;
  height: 665px;
  flex-direction: column;
  margin-left: 40px;
  overflow-y: auto;
  overflow-x: hidden;

  /* scroll styling */
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6c2ff;
  }

  ::-webkit-scrollbar-track {
    background-color: #bfbfbf;
  }
  /* fireFox scroll style*/
  scrollbar-color: #d6c2ff #bfbfbf;
  scrollbar-width: thin;
`;
const StyledCreateCategory = styled.div`
  height: 66px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledColorSelectorButton = styled.button<{
  backgroundColor: string;
  isMargin?: boolean;
}>`
  background-color: ${(p) => p.backgroundColor};
  border-radius: 50%;
  border: 1px solid #d6c2ff;
  width: 26px;
  height: 26px;
  cursor: pointer;
  /* margin: ${(p) => (p.isMargin ? '20px 0px 0px 0px' : null)}; */
`;

const StyledColorSelectorListWrapper = styled.div`
  width: 46px;
  height: 363px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  left: 30px;
  background-color: ${(p) => p.theme.colors.white};
  border: 0.5px solid #bfbfbf;
  box-sizing: border-box;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin: 300px 0px 0px 0px;
  padding: 20px 0px 10px 0px;
`;

interface PropTypes {
  onClickCloseBtn: () => void;
  categories: Category[] | undefined;
  getCategoriesRefetch: () => void;
}

export const CategorySettingTemplate = ({
  onClickCloseBtn,
  categories,
  getCategoriesRefetch,
}: PropTypes) => {
  const theme = useTiryTheme();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isSelectorListOpen, setIsSelectorListOpen] = useState<boolean>(false);
  const [createCategory, setCreateCategory] = useState<CreateCategory>({
    color: theme.colors.white,
    name: '',
  });

  const [createCategoryMutation, { loading: createCategoryLoading }] =
    useMutation(CREATE_CATEGORY, {
      onCompleted: () => {
        setCreateCategory({
          color: theme.colors.white,
          name: '',
        });
        getCategoriesRefetch();
      },
      onError: () => {
        window.alert('카테고리 생성에 실패했어요, 잠시 후에 시도해주세요!');
      },
    });

  const onClickCreateCategory = () => {
    console.log({ ...createCategory });
    if (
      createCategory.name.length > 0 &&
      createCategory.color !== theme.colors.white
    ) {
      createCategoryMutation({ variables: { input: { ...createCategory } } });
    } else {
      window.alert('카테고리 색과 이름을 넣어주세요!!');
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickCreateCategory();
    }
  };

  if (createCategoryLoading) {
    return <LoadingPage />;
  }

  return (
    <StyledCategorySettingTemplate
      onClick={() => {
        if (isSelectorListOpen) {
          setIsSelectorListOpen(false);
        }
      }}
    >
      <div
        style={{
          minHeight: 60,
          marginLeft: 42,
          borderBottom: '0.5px solid',
          borderBottomColor: '#BFBFBF',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontWeight: 500,
            fontSize: 20,
            color: '#000000',
          }}
        >
          카테고리 관리하기
        </span>
      </div>

      <StyledCategoryList>
        <StyledCreateCategory>
          <div
            style={{
              width: '100%',
              minHeight: 70,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StyledColorSelectorButton
              type="button"
              aria-label="StyledColorSelectorButton"
              backgroundColor={createCategory.color}
              onClick={() => {
                setIsSelectorListOpen(!isSelectorListOpen);
              }}
            />

            {isSelectorListOpen ? (
              <StyledColorSelectorListWrapper>
                {theme.categoryColorList.map((color) => (
                  <StyledColorSelectorButton
                    key={color}
                    type="button"
                    aria-label="StyledColorSelectorButton"
                    backgroundColor={color}
                    onClick={() => {
                      setCreateCategory({
                        ...createCategory,
                        color,
                      });
                      setIsSelectorListOpen(!isSelectorListOpen);
                      inputRef.current?.focus();
                    }}
                    isMargin
                  />
                ))}
              </StyledColorSelectorListWrapper>
            ) : null}
            <input
              style={{
                width: 272,
                marginLeft: 14,
                fontSize: 20,
                border: 0,
                outline: 0,
              }}
              ref={inputRef}
              type="text"
              placeholder="카테고리 추가하기"
              maxLength={10}
              value={createCategory.name}
              onKeyPress={onKeyPress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCreateCategory({
                  ...createCategory,
                  name: e.target.value,
                });
              }}
            />
            <button
              type="button"
              style={{
                border: 0,
                outline: 0,
                backgroundColor: '#00000000',
                cursor: 'pointer',
                marginRight: 0,
                marginLeft: 30,
              }}
              onClick={onClickCreateCategory}
            >
              <img src={CheckButtonImg} alt="checkButton" />
            </button>
          </div>
        </StyledCreateCategory>
        {categories?.map((category: Category) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            circleColor={category.color}
          />
        ))}
      </StyledCategoryList>
      <StyledCloseButton type="button" onClick={onClickCloseBtn}>
        닫기
      </StyledCloseButton>
    </StyledCategorySettingTemplate>
  );
};
