import styled from 'styled-components';
import { ColorCircle } from '../../atoms/colorCircle/colorCircle';

interface PropTypes {
  circleColor: string;
  title: string;
}

export const CategoryCard = ({ circleColor, title }: PropTypes) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderTop: '0.5px solid',
        borderTopColor: '#BFBFBF',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ColorCircle
          width={26}
          height={26}
          borderRadius={100}
          backgroundColor={circleColor}
        />
        <p style={{ marginLeft: 14, fontSize: 20 }}>{title}</p>
      </div>
    </div>
  );
};
