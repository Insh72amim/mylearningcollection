import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
});

const Mermaid = ({ chart }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      mermaid.contentLoaded();
      // Reset the container content to ensure clean render
      containerRef.current.innerHTML = '';
      
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      
      mermaid.render(id, chart).then(({ svg }) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      });
    }
  }, [chart]);

  return <div className="mermaid-container flex justify-center my-4" ref={containerRef} />;
};

export default Mermaid;
