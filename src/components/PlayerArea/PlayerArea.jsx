// filepath: /c:/Users/Mitxel/Desktop/Proyectos de desarrollo/my-card-game/src/components/PlayerArea/PlayerArea.jsx
import React from 'react';
import Card from '../Card/Card';
import { useGame } from '../../contexts/GameContext';

const PlayerArea = ({ playerId }) => {
  const { state, dispatch } = useGame();
  const player = state.players?.[playerId];

  if (!player) {
    return <div className="player-area">Jugador no encontrado</div>;
  }

  const handleCardClick = (card) => {
    if (state.currentPlayer === playerId && !player.battlefield) {
      dispatch({ type: 'SELECT_CARD', card });
    }
  };

  return (
    <div className={`player-area p-4 border-2 ${state.currentPlayer === playerId ? 'border-green-500 bg-green-100' : 'border-blue-500'} m-2 rounded-lg`}>
      <h2 className="text-xl font-bold">Jugador {playerId + 1}</h2>
      <div className="energy-counter text-lg">Energía: {player?.energy || 0}</div>
      {player?.battlefield && <Card card={player.battlefield} />}
      <div className="hand grid grid-cols-3 gap-2 mt-4">
        {player?.hand?.map((card, index) => (
          <div key={index} onClick={() => handleCardClick(card)}>
            <Card card={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerArea;