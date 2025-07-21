
import React from 'react';
import { BOX_SIZE_PX, COLOR_SEQUENCE, COLOR_MAP, CLIP_PATHS } from '../constants.ts';

interface BoxProps {
  rotation: number;
}

const Box: React.FC<BoxProps> = ({ rotation }) => {
  return (
    <div
      className="relative transition-transform duration-200 ease-in-out filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
      style={{
        width: `${BOX_SIZE_PX}px`,
        height: `${BOX_SIZE_PX}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div
        className={`absolute w-full h-full ${COLOR_MAP[COLOR_SEQUENCE[0]].bg}`}
        style={{ clipPath: CLIP_PATHS.top }}
      />
      <div
        className={`absolute w-full h-full ${COLOR_MAP[COLOR_SEQUENCE[1]].bg}`}
        style={{ clipPath: CLIP_PATHS.right }}
      />
      <div
        className={`absolute w-full h-full ${COLOR_MAP[COLOR_SEQUENCE[2]].bg}`}
        style={{ clipPath: CLIP_PATHS.bottom }}
      />
      <div
        className={`absolute w-full h-full ${COLOR_MAP[COLOR_SEQUENCE[3]].bg}`}
        style={{ clipPath: CLIP_PATHS.left }}
      />
    </div>
  );
};

export default Box;