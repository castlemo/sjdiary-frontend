import styled from 'styled-components';
import Lottie from 'react-lottie';

import { ReactPropTypes } from 'react';
import LoadingLottie from '../../../assets/animation/loading.json';

const StyledLoadingTemplate = styled.div<{ isTransparency: boolean }>`
  position: absolute;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => (p.isTransparency ? '#00000021' : '#FFFFFF')};
`;
export const LoadingTemplate = ({
  isTransparency = false,
}: {
  isTransparency: boolean;
}) => {
  return (
    <StyledLoadingTemplate isTransparency={isTransparency}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: 125 }}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: LoadingLottie,
          }}
          width={250}
          height={250}
          isStopped={false}
          isPaused={false}
          isClickToPauseDisabled={false}
        />
      </div>
    </StyledLoadingTemplate>
  );
};
