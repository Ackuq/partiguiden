import React from 'react';
import { number, object } from 'prop-types';

const CustomizedTick = ({ payload, x, y }) => {
  const { value } = payload;
  const href = value ? `../../static/images/party-logos/${value.toUpperCase()}.svg` : null;
  const X = parseInt(x, 10) - 27;
  const Y = parseInt(y, 10) - 15;
  return <image x={`${X}`} y={`${Y}`} href={href} width="30" height="30" />;
};

CustomizedTick.propTypes = {
  x: number,
  y: number,
  payload: object
};

CustomizedTick.defaultProps = {
  x: 0,
  y: 0,
  payload: {}
};

export default CustomizedTick;
