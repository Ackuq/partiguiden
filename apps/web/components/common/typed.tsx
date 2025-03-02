"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import type { TypedOptions } from "typed.js";
import TypedJS from "typed.js";

const Typed: React.FC<TypedOptions> = ({ ...options }) => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new TypedJS(el.current, options);

    return () => {
      typed.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span ref={el} />;
};

export default Typed;
