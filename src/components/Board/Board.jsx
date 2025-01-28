import React, { useState } from 'react';
import PlayerArea from '../PlayerArea/PlayerArea';
import Card from '../Card/Card';
import { useGame } from '../../contexts/GameContext';

const Board = () => {
  const { state, dispatch } = useGame();
  const [energyRecharged, setEnergyRecharged] = useState(false);

  const handleAttack = (attack) => {
    dispatch({ type: 'ATTACK', attack });
    dispatch({ type: 'SWITCH_TURN' });
    setEnergyRecharged(false);
  };

  const handleRecharge = () => {
    if (!energyRecharged) {
      dispatch({ type: 'RECHARGE_ENERGY' });
      setEnergyRecharged(true);
    }
  };

  const handleEndTurn = () => {
    dispatch({ type: 'SWITCH_TURN' });
    setEnergyRecharged(false);
  };

  const currentPlayer = state.players[state.currentPlayer];
  const opponentPlayer = state.players[1 - state.currentPlayer];

  return (
    <div className="game-board grid grid-cols-1 gap-4 p-4">
      {/* Player 1 Area */}
      <PlayerArea playerId={0} />

      {/* Battlefield */}
      <div className={`battle-field flex flex-col items-center border-4 border-dashed border-gray-600 rounded-lg p-4 my-4 ${state.currentPlayer === 0 ? 'bg-green-100 bg-opacity-50' : ''}`}>
        {/* Turn Indicator */}
        <div className="turn-indicator text-xl font-bold mb-4">
          Turno de: Jugador {state.currentPlayer + 1}
        </div>

        {/* Active Cards */}
        <div className="active-cards flex justify-center items-center min-h-48 mb-4">
          {opponentPlayer.battlefield && (
            <div className="mx-4">
              <Card card={opponentPlayer.battlefield} isBattlefield />
            </div>
          )}
          {currentPlayer.battlefield && (
            <div className="mx-4">
              <Card card={currentPlayer.battlefield} isBattlefield />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons flex gap-4 mb-4">
          <button onClick={handleRecharge} className="p-2 bg-blue-500 text-white rounded" disabled={energyRecharged}>
            Recargar Energía
          </button>
          <button onClick={handleEndTurn} className="p-2 bg-red-500 text-white rounded">
            Terminar Turno
          </button>
        </div>

        {/* Energy Counter */}
        <div className="current-data text-lg">
          <div>Energía Jugador 1: {state.players[0].energy}</div>
          <div>Energía Jugador 2: {state.players[1].energy}</div>
        </div>
      </div>

      {/* Player 2 Area */}
      <PlayerArea playerId={1} />
    </div>
  );
};

export default Board;