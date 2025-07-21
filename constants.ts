
import { TimerMode } from './types';

export const DURATION: Record<TimerMode, number> = {
  [TimerMode.WORK]: 25 * 60, // 25 minutes
  [TimerMode.SHORT_BREAK]: 5 * 60, // 5 minutes
  [TimerMode.LONG_BREAK]: 15 * 60, // 15 minutes
};

export const SESSIONS_UNTIL_LONG_BREAK = 4;
