import React from 'react';
import PlayerArea from '../PlayerArea/PlayerArea';
import { useGame } from '../../contexts/GameContext';

const Board = () => {
  const { state } = useGame();

  return (
    <div className="game-board flex flex-col gap-8 p-4">
      <PlayerArea playerId={0} />
      <div className="battle-field min-h-48 border-4 border-dashed border-gray-600 rounded-lg p-4 my-4">
        {/* Aquí iría la lógica del campo de batalla */}
      </div>
      <PlayerArea playerId={1} />
    </div>
  );
};

export default Board;