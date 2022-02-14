import Lottie from 'react-lottie';
import styled from 'styled-components';

import * as loading from '../../assets/animation/loading.json';

const StyledLoadingTemplate = styled.div`
  position: absolute;

  height: 100vh;
  width: 60%;
  max-width: 861px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.purple3};
  opacity: 0.5;

  z-index: 10;
`;
export const LoadingTemplate = (): JSX.Element => {
  return (
    <StyledLoadingTemplate>
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: loading,
        }}
        height={400}
        width={400}
        isStopped={false}
        isPaused={false}
      />
    </StyledLoadingTemplate>
  );
};
