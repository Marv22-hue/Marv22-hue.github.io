import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerMode } from '../types.ts';
import { DURATION, SESSIONS_UNTIL_LONG_BREAK } from '../constants.ts';

export const useTimer = () => {
  const [mode, setMode] = useState<TimerMode>(TimerMode.WORK);
  const [timeRemaining, setTimeRemaining] = useState<number>(DURATION[TimerMode.WORK]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessionsCompleted, setSessionsCompleted] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // This effect ensures the audio object is only created on the client side.
    audioRef.current = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
  }, []);
  
  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  }, []);

  const handleNextMode = useCallback(() => {
    playSound();
    if (mode === TimerMode.WORK) {
      const newSessionsCompleted = sessionsCompleted + 1;
      setSessionsCompleted(newSessionsCompleted);
      if (newSessionsCompleted % SESSIONS_UNTIL_LONG_BREAK === 0) {
        setMode(TimerMode.LONG_BREAK);
        setTimeRemaining(DURATION[TimerMode.LONG_BREAK]);
      } else {
        setMode(TimerMode.SHORT_BREAK);
        setTimeRemaining(DURATION[TimerMode.SHORT_BREAK]);
      }
    } else {
      setMode(TimerMode.WORK);
      setTimeRemaining(DURATION[TimerMode.WORK]);
    }
    setIsActive(false);
  }, [mode, sessionsCompleted, playSound]);


  useEffect(() => {
    let interval: number | null = null;

    if (isActive && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeRemaining === 0) {
      handleNextMode();
    }

    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [isActive, timeRemaining, handleNextMode]);

  useEffect(() => {
    document.title = `${Math.floor(timeRemaining / 60)
      .toString()
      .padStart(2, '0')}:${(timeRemaining % 60).toString().padStart(2, '0')} | ${
      mode.replace('_', ' ')
    }`;
  }, [timeRemaining, mode]);

  const startTimer = useCallback(() => {
    setIsActive(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeRemaining(DURATION[mode]);
  }, [mode]);

  const switchMode = useCallback((newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeRemaining(DURATION[newMode]);
  }, []);

  return {
    mode,
    timeRemaining,
    isActive,
    sessionsCompleted,
    setMode: switchMode,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};