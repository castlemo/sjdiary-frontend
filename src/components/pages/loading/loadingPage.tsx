import { ReactPropTypes } from 'react';
import { LoadingTemplate } from '../../templates/loading/loadingTemplate';

export const LoadingPage = ({
  isTransparency = false,
}: {
  isTransparency?: boolean;
}) => {
  return <LoadingTemplate isTransparency={isTransparency} />;
};
