
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, ColorName } from './types';
import {
  COLOR_SEQUENCE,
  BALL_SIZE_PX,
  GAME_SPEED,
  HIGH_SCORE_KEY,
  BOX_SIZE_PX
} from './constants';
import Ball from './components/Ball';
import Box from './components/Box';
import GameOver from './components/GameOver';
import RotateCwIcon from './components/RotateCwIcon';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Idle);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const savedScore = localStorage.getItem(HIGH_SCORE_KEY);
    return savedScore ? parseInt(savedScore, 10) : 0;
  });
  const [rotation, setRotation] = useState<number>(0);
  const [ballY, setBallY] = useState<number>(-BALL_SIZE_PX);
  const [ballColorIndex, setBallColorIndex] = useState<number>(0);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const lastScore = useRef<number>(0);
  const [showScorePopper, setShowScorePopper] = useState(false);

  const collisionPoint = (gameAreaRef.current?.clientHeight ?? window.innerHeight) * 0.7 - BOX_SIZE_PX / 2;

  const resetBall = useCallback(() => {
    setBallY(-BALL_SIZE_PX);
    setBallColorIndex(Math.floor(Math.random() * COLOR_SEQUENCE.length));
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    lastScore.current = 0;
    setRotation(0);
    resetBall();
    setGameState(GameState.Playing);
  }, [resetBall]);
  
  const handleUserInteraction = useCallback(() => {
    if (gameState === GameState.Playing) {
      setRotation(prev => prev + 90);
    } else if (gameState === GameState.Idle) {
      startGame();
    }
  }, [gameState, startGame]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleUserInteraction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // For mobile, tapping anywhere works
    window.addEventListener('click', handleUserInteraction);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleUserInteraction);
    };
  }, [handleUserInteraction]);

  useEffect(() => {
    if (score > lastScore.current) {
      setShowScorePopper(true);
      const timer = setTimeout(() => setShowScorePopper(false), 300);
      lastScore.current = score;
      return () => clearTimeout(timer);
    }
  }, [score]);


  const gameLoop = useCallback(() => {
    if (gameState !== GameState.Playing) return;

    setBallY(prevY => {
      const newY = prevY + GAME_SPEED;

      if (newY >= collisionPoint) {
        const topColorIndex = Math.round((rotation / 90)) % 4;
        const correctColorIndex = (4 - topColorIndex) % 4; // The box rotates, so the initial top color moves. We need to find which color is now at the top.
        
        const currentTopColor = COLOR_SEQUENCE[correctColorIndex];
        const ballColor = COLOR_SEQUENCE[ballColorIndex];

        if (currentTopColor === ballColor) {
          setScore(s => s + 1);
          resetBall();
          return -BALL_SIZE_PX;
        } else {
          setGameState(GameState.GameOver);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem(HIGH_SCORE_KEY, score.toString());
          }
          return prevY;
        }
      }
      return newY;
    });

    animationFrameId.current = requestAnimationFrame(gameLoop);
  }, [gameState, rotation, ballColorIndex, score, highScore, resetBall, collisionPoint]);


  useEffect(() => {
    if (gameState === GameState.Playing) {
      animationFrameId.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameState, gameLoop]);
  
  const currentBallColorName = COLOR_SEQUENCE[ballColorIndex];

  return (
    <main
      ref={gameAreaRef}
      className="w-screen h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden flex flex-col items-center justify-center relative select-none font-sans"
    >
      <div className="absolute top-5 right-5 text-lg text-gray-400 font-bold text-right">
        <p>SCORE: {score}</p>
        <p>BEST: {highScore}</p>
      </div>

       <div className="absolute top-1/4 transform -translate-y-1/2">
         <div className={`relative transition-transform duration-300 ${showScorePopper ? 'scale-150' : 'scale-100'}`}>
          <p className="text-8xl font-black text-white opacity-20">{score}</p>
         </div>
      </div>


      {gameState === GameState.Playing && (
        <Ball yPosition={ballY} colorName={currentBallColorName} />
      )}

      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '70vh' }}>
         <Box rotation={rotation} />
      </div>

      {gameState === GameState.Idle && (
        <div className="text-center text-white animate-pulse">
          <h1 className="text-5xl font-extrabold tracking-wider">COLOR DROP</h1>
          <p className="mt-4 text-xl text-gray-300">Tap Screen or Press Space to Start</p>
           <div className="mt-8 flex items-center justify-center gap-4 text-gray-400">
                <RotateCwIcon />
                <span>Tap or Space to Rotate</span>
            </div>
        </div>
      )}

      {gameState === GameState.GameOver && (
        <GameOver score={score} highScore={highScore} onRestart={startGame} />
      )}
    </main>
  );
};

export default App;
