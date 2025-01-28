import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import cardsData from '../../data/cards.json';

const GameModeSelector = () => {
  const { dispatch } = useGame();
  const [player1Type, setPlayer1Type] = useState('Fuego');
  const [player2Type, setPlayer2Type] = useState('Agua');

  const startGame = (mode) => {
    dispatch({ type: 'START_GAME', mode, player1Type, player2Type });
  };

  return (
    <div className="mode-selector">
      <h1>Selecciona Modo de Juego</h1>
      <div>
        <label>Jugador 1 Tipo:</label>
        <select value={player1Type} onChange={(e) => setPlayer1Type(e.target.value)}>
          {cardsData.types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Jugador 2 Tipo:</label>
        <select value={player2Type} onChange={(e) => setPlayer2Type(e.target.value)}>
          {cardsData.types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <button onClick={() => startGame('2player')}>2 Jugadores</button>
      <button disabled>Vs CPU (Próximamente)</button>
    </div>
  );
};

export default GameModeSelector;