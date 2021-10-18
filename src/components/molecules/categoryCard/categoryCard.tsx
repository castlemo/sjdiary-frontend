import { ColorCircle } from '../../atoms/colorCircle/colorCircle';

interface PropTypes {
  circleColor: string;
  title: string;
  onClickDelete: () => void;
}

export const CategoryCard = ({
  circleColor,
  title,
  onClickDelete = () => {},
}: PropTypes) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderTop: '0.5px solid',
        borderTopColor: '#BFBFBF',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
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
      <button
        type="button"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 17,
          border: 0,
          backgroundColor: '#FFFFFF',
          cursor: 'pointer',
        }}
        onClick={onClickDelete}
      >
        <span
          style={{
            width: 37,
            fontSize: 20,
            color: '#CACACA',
            fontWeight: 'normal',
            fontStyle: 'normal',
          }}
        >
          삭제
        </span>
      </button>
    </div>
  );
};
