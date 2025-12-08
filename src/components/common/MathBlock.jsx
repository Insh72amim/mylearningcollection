import React, { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

const MathBlock = ({ math, block = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(math, containerRef.current, {
        throwOnError: false,
        displayMode: block,
      });
    }
  }, [math, block]);

  return <span ref={containerRef} className={block ? "block my-4 text-center" : "inline px-1"} />;
};

export default MathBlock;
