import React from 'react';
import { useGame } from '../../contexts/GameContext';
import './GameModeSelector.css';

const GameModeSelector = () => {
  const { dispatch } = useGame();

  const startGame = (mode) => {
    dispatch({ type: 'START_GAME', mode });
  };

  return (
    <div className="mode-selector">
      <h1>Selecciona Modo de Juego</h1>
      <button onClick={() => startGame('2player')}>2 Jugadores</button>
      <button disabled>Vs CPU (Próximamente)</button>
    </div>
  );
};

export default GameModeSelector;