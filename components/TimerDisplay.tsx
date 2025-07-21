import React from 'react';
import { TimerMode } from '../types.ts';
import { DURATION } from '../constants.ts';

interface TimerDisplayProps {
  mode: TimerMode;
  timeRemaining: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ mode, timeRemaining }) => {
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const totalDuration = DURATION[mode];
  const progress = ((totalDuration - timeRemaining) / totalDuration) * circumference;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const colorClasses: Record<TimerMode, string> = {
    [TimerMode.WORK]: 'text-red-400',
    [TimerMode.SHORT_BREAK]: 'text-cyan-400',
    [TimerMode.LONG_BREAK]: 'text-blue-400',
  };

  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto">
      <svg className="absolute w-full h-full" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-white/20"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          className={`transform -rotate-90 origin-center transition-all duration-300 ${colorClasses[mode]}`}
        />
      </svg>
      <div className="z-10 text-center">
        <p className={`text-6xl font-bold tracking-tighter ${colorClasses[mode]}`}>
          {formatTime(timeRemaining)}
        </p>
      </div>
    </div>
  );
};

export default TimerDisplay;