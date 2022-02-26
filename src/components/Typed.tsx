import React, { useRef } from 'react';
import TypedJS, { TypedOptions } from 'typed.js';

const Typed: React.FC<TypedOptions> = ({ ...options }) => {
  const typed = useRef<TypedJS | null>(null);

  return (
    <span
      ref={(ref) => {
        if (ref && !typed.current) {
          typed.current = new TypedJS(ref, options);
        }
      }}
    />
  );
};

export default Typed;
