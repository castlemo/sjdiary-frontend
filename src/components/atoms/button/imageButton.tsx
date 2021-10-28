import React from 'react';

interface PropTypes {
  buttonStyle?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  imgSrc: string;
  imgAlt: string;
  onClick?: () => void;
}

export const ImageButton = ({
  buttonStyle = {},
  imgSrc,
  imgAlt,
  imageStyle = {},
  onClick = () => {},
}: PropTypes) => {
  return (
    <button
      type="button"
      style={{
        border: 0,
        backgroundColor: '#FFFFFF',
        ...buttonStyle,
      }}
      onClick={onClick}
    >
      <img src={imgSrc} alt={imgAlt} style={imageStyle} />
    </button>
  );
};
