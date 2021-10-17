import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const NotFoundPage = () => {
  const history = useHistory();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 100,
      }}
    >
      NotFoundPage <br />
      ????????????????
      <button
        style={{ width: 800, height: 300 }}
        type="button"
        onClick={() => history.push('/')}
      >
        홈으로가기
      </button>
    </div>
  );
};
