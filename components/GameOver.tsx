
import React from 'react';

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, highScore, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
      <div className="bg-gray-800 border-2 border-gray-600 rounded-xl p-8 text-center text-white shadow-2xl animate-fade-in-up">
        <h2 className="text-5xl font-extrabold text-red-500">GAME OVER</h2>
        <p className="mt-4 text-2xl">
          Your Score: <span className="font-bold text-yellow-400">{score}</span>
        </p>
        <p className="mt-2 text-lg text-gray-300">
          High Score: <span className="font-bold text-yellow-400">{highScore}</span>
        </p>
        <button
          onClick={onRestart}
          className="mt-8 px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
        >
          Play Again
        </button>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GameOver;
