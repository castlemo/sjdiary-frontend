import styled from 'styled-components';

const StyledLoadingTemplate = styled.div<{ isTransparency: boolean }>`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: pink;
`;
export const LoadingTemplate = ({
  isTransparency = false,
}: {
  isTransparency?: boolean;
}): JSX.Element => {
  return (
    <StyledLoadingTemplate isTransparency={isTransparency}>
      loading중
    </StyledLoadingTemplate>
  );
};
