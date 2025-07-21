import React from 'react';
import { TimerMode } from '../types.ts';

interface ModeSwitcherProps {
  currentMode: TimerMode;
  setMode: (mode: TimerMode) => void;
}

const ModeButton: React.FC<{
  mode: TimerMode;
  currentMode: TimerMode;
  setMode: (mode: TimerMode) => void;
  children: React.ReactNode;
}> = ({ mode, currentMode, setMode, children }) => {
  const isActive = mode === currentMode;
  const activeClasses = 'bg-white/20 text-white';
  const inactiveClasses = 'bg-transparent text-white/70 hover:bg-white/10';

  return (
    <button
      onClick={() => setMode(mode)}
      className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      {children}
    </button>
  );
};

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ currentMode, setMode }) => {
  return (
    <div className="flex justify-center items-center space-x-2 bg-black/20 p-2 rounded-xl">
      <ModeButton mode={TimerMode.WORK} currentMode={currentMode} setMode={setMode}>
        Pomodoro
      </ModeButton>
      <ModeButton mode={TimerMode.SHORT_BREAK} currentMode={currentMode} setMode={setMode}>
        Short Break
      </ModeButton>
      <ModeButton mode={TimerMode.LONG_BREAK} currentMode={currentMode} setMode={setMode}>
        Long Break
      </ModeButton>
    </div>
  );
};

export default ModeSwitcher;