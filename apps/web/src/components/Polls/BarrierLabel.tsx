interface BarrierLabelProps {
  offset?: number;
  viewBox?: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  title: string;
}

const BarrierLabel: React.FC<BarrierLabelProps> = ({
  offset = 0,
  viewBox = { x: 0, y: 0, width: 0, height: 0 },
  title,
}) => {
  const width = 70;
  const height = 25;

  const x = viewBox.width / 2 + viewBox.x;
  const { y } = viewBox;

  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - height / 2}
        offset={offset}
        rx="5"
        ry="5"
        width={width}
        height={height}
      />
      <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize={11}>
        {title}
      </text>
    </g>
  );
};

BarrierLabel.defaultProps = {
  offset: 0,
  viewBox: { x: 0, y: 0, width: 0, height: 0 },
};

export default BarrierLabel;
