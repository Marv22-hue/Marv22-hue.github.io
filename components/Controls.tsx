import React from 'react';
import { PlayIcon, PauseIcon, ResetIcon } from './icons.tsx';

interface ControlsProps {
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({ isActive, onStart, onPause, onReset }) => {
  return (
    <div className="flex items-center justify-center space-x-6">
      <button
        onClick={onReset}
        className="text-white/70 hover:text-white transition-colors transform hover:scale-110 duration-300"
        aria-label="Reset Timer"
      >
        <ResetIcon className="w-8 h-8" />
      </button>
      
      <button
        onClick={isActive ? onPause : onStart}
        className="w-24 h-24 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
        aria-label={isActive ? 'Pause Timer' : 'Start Timer'}
      >
        {isActive ? <PauseIcon className="w-12 h-12" /> : <PlayIcon className="w-12 h-12 ml-2" />}
      </button>

      {/* Placeholder for future settings icon */}
      <div className="w-8 h-8"></div>
    </div>
  );
};

export default Controls;