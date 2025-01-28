import React from 'react';
import PlayerArea from '../PlayerArea/PlayerArea';
import { useGame } from '../../contexts/GameContext';
import './Board.css';

const Board = () => {
  const { state } = useGame();

  return (
    <div className="game-board">
      <PlayerArea playerId={0} />
      <div className="battle-field">
        {/* Aquí iría la lógica del campo de batalla */}
      </div>
      <PlayerArea playerId={1} />
    </div>
  );
};

export default Board;