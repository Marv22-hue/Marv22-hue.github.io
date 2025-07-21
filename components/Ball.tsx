
import React from 'react';
import { ColorName } from '../types.ts';
import { BALL_SIZE_PX, COLOR_MAP } from '../constants.ts';

interface BallProps {
  yPosition: number;
  colorName: ColorName;
}

const Ball: React.FC<BallProps> = ({ yPosition, colorName }) => {
  const colorClasses = COLOR_MAP[colorName];

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 rounded-full filter ${colorClasses.glow}`}
      style={{
        top: `${yPosition}px`,
        width: `${BALL_SIZE_PX}px`,
        height: `${BALL_SIZE_PX}px`,
      }}
    >
        <div className={`w-full h-full rounded-full ${colorClasses.bg}`}></div>
    </div>
  );
};

export default Ball;