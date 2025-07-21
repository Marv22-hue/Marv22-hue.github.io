
import { ColorName } from './types';

export const BOX_SIZE_PX = 150;
export const BALL_SIZE_PX = 40;
export const GAME_SPEED = 5; // Pixels per frame update

// The order of colors on the box, starting from the top and going clockwise.
export const COLOR_SEQUENCE: ColorName[] = ['red', 'blue', 'yellow', 'green'];

export const COLOR_MAP: Record<ColorName, { bg: string; shadow: string; glow: string }> = {
  red: { bg: 'bg-red-500', shadow: 'shadow-red-500/50', glow: 'drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]' },
  blue: { bg: 'bg-blue-500', shadow: 'shadow-blue-500/50', glow: 'drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]' },
  green: { bg: 'bg-green-500', shadow: 'shadow-green-500/50', glow: 'drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]' },
  yellow: { bg: 'bg-yellow-400', shadow: 'shadow-yellow-400/50', glow: 'drop-shadow-[0_0_10px_rgba(250,204,21,0.7)]' },
};

// CSS clip-path polygons for the four triangles of the box.
export const CLIP_PATHS = {
  top: 'polygon(0% 0%, 100% 0%, 50% 50%)',
  right: 'polygon(100% 0%, 50% 50%, 100% 100%)',
  bottom: 'polygon(0% 100%, 100% 100%, 50% 50%)',
  left: 'polygon(0% 0%, 50% 50%, 0% 100%)',
};

export const HIGH_SCORE_KEY = 'colorBoxDropHighScore';
