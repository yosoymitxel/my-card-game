// filepath: /c:/Users/Mitxel/Desktop/Proyectos de desarrollo/my-card-game/src/components/PlayerArea/PlayerArea.jsx
import React from 'react';
import Card from '../Card/Card';
import { useGame } from '../../contexts/GameContext';

const PlayerArea = ({ playerId }) => {
  const { state } = useGame();
  const player = state.players?.[playerId];

  if (!player) {
    return <div className="player-area">Jugador no encontrado</div>;
  }

  return (
    <div className={`player-area ${state.currentPlayer === playerId ? 'active' : ''}`}>
      <h2>Jugador {playerId + 1}</h2>
      <div className="energy-counter">Energía: {player?.energy || 0}</div>
      {player?.activeMonster && <Card card={player.activeMonster} />}
      <div className="hand">
        {player?.hand?.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

export default PlayerArea;