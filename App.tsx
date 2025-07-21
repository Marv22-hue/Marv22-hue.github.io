import React from 'react';
import { useTimer } from './hooks/useTimer.ts';
import { TimerMode } from './types.ts';
import TimerDisplay from './components/TimerDisplay.tsx';
import ModeSwitcher from './components/ModeSwitcher.tsx';
import Controls from './components/Controls.tsx';

const App: React.FC = () => {
  const {
    mode,
    timeRemaining,
    isActive,
    sessionsCompleted,
    setMode,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimer();

  const colorMap: { [key in TimerMode]: string } = {
    [TimerMode.WORK]: 'bg-red-500',
    [TimerMode.SHORT_BREAK]: 'bg-cyan-500',
    [TimerMode.LONG_BREAK]: 'bg-blue-500',
  };

  const transitionColor = colorMap[mode];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 text-white transition-colors duration-500 ${transitionColor}`}>
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">Pomodoro Focus</h1>
          <p className="text-lg opacity-80 mt-2">Stay focused, take breaks, be productive.</p>
        </header>

        <main className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl">
          <ModeSwitcher currentMode={mode} setMode={setMode} />
          
          <div className="my-8">
            <TimerDisplay mode={mode} timeRemaining={timeRemaining} />
          </div>

          <Controls
            isActive={isActive}
            onStart={startTimer}
            onPause={pauseTimer}
            onReset={resetTimer}
          />
        </main>
        
        <footer className="text-center mt-8">
          <p className="text-lg font-semibold tracking-wider">
            Completed Sessions: {sessionsCompleted}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;