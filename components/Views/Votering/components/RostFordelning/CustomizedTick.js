import React from 'react';

export default ({ payload, x, y }) => {
  const { value } = payload;

  let X = parseInt(x, 10);
  let Y = parseInt(y, 10);
  X -= 27;
  Y -= 15;
  return (
    <image
      x={`${X}`}
      y={`${Y}`}
      href={`../../static/images/party-logos/${value}.svg`}
      width="30"
      height="30"
    />
  );
};
