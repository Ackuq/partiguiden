import React from 'react';

interface Props {
  payload?: {
    value: string;
  };
  x?: string;
  y?: string;
}

const CustomizedTick: React.FC<Props> = ({ payload = {}, x = '0', y = '0' }) => {
  const { value } = payload;
  const href = value ? `/static/images/party-logos/${value.toUpperCase()}.svg` : '';
  const X = parseInt(x, 10) - 27;
  const Y = parseInt(y, 10) - 15;
  return <image x={`${X}`} y={`${Y}`} href={href} width="30" height="30" />;
};

export default CustomizedTick;
