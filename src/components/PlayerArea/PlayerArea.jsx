import React, { useEffect } from 'react';
import Card from '../Card/Card';
import { useGame } from '../../contexts/GameContext';

const PlayerArea = ({ playerId }) => {
  const { state, dispatch } = useGame();
  const player = state.players?.[playerId];

  useEffect(() => {
    console.log(`Player ${playerId + 1} hand:`, player?.hand);
  }, [player?.hand, playerId]);

  if (!player) {
    return <div className="player-area">Jugador no encontrado</div>;
  }

  const handleCardClick = (card) => {
    if (state.currentPlayer === playerId && !player.activeCard) {
      dispatch({ type: 'SELECT_CARD', card: { ...card, owner: playerId } });
    }
  };

  return (
    <div className={`player-area p-4 border-2 ${state.currentPlayer === playerId ? 'border-green-500 bg-green-100' : 'border-blue-500'} m-2 rounded-lg`}>
      <h2 className="text-xl font-bold">Jugador {playerId + 1}</h2>
      <div className="energy-counter text-lg">Energía: {player?.energy || 0}</div>
      <div className="hand grid grid-cols-3 gap-2 mt-4">
        {player?.hand?.filter(card => card.name !== player.activeCard?.name).map((card, index) => (
          <div key={index} onClick={() => handleCardClick(card)}>
            <Card card={{ ...card, owner: playerId }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerArea;