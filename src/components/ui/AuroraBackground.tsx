import React from 'react';

const AuroraBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[120vmax] h-[120vmax] rounded-full bg-[radial-gradient(circle_at_center,_#0ea5e9,_transparent_40%)] opacity-30 blur-[100px] animate-[aurora_25s_linear_infinite_alternate] will-change-transform"></div>
        <div className="absolute bottom-[-50%] right-[-50%] w-[120vmax] h-[120vmax] rounded-full bg-[radial-gradient(circle_at_center,_#312e81,_transparent_40%)] opacity-30 blur-[100px] animate-[aurora_30s_linear_infinite_alternate-reverse] will-change-transform"></div>
    </div>
  );
};

export default AuroraBackground;
