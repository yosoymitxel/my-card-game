import React from 'react';
import PlayerArea from '../PlayerArea/PlayerArea';
import Card from '../Card/Card';
import { useGame } from '../../contexts/GameContext';

const Board = () => {
  const { state, dispatch } = useGame();

  const handleAttack = (attack) => {
    dispatch({ type: 'ATTACK', attack });
    dispatch({ type: 'SWITCH_TURN' });
  };

  const handleRecharge = () => {
    dispatch({ type: 'RECHARGE_ENERGY' });
    dispatch({ type: 'SWITCH_TURN' });
  };

  const currentPlayer = state.players[state.currentPlayer];

  return (
    <div className="game-board flex flex-col gap-8 p-4">
      <PlayerArea playerId={0} />
      <div className="battle-field min-h-48 border-4 border-dashed border-gray-600 rounded-lg p-4 my-4">
        {currentPlayer.battlefield ? (
          <div>
            <Card card={currentPlayer.battlefield} isBattlefield />
            <div className="attacks mt-4">
              {currentPlayer.battlefield.attacks.map((attack, index) => (
                <button
                  key={index}
                  onClick={() => handleAttack(attack)}
                  className={`p-2 m-2 rounded ${currentPlayer.energy >= attack.energy_required ? 'border-green-500' : 'border-red-500'}`}
                >
                  {attack.name} ({attack.energy_required} energía)
                </button>
              ))}
            </div>
            {currentPlayer.energy < currentPlayer.battlefield.attacks[0].energy_required && (
              <button onClick={handleRecharge} className="mt-4 p-2 bg-blue-500 text-white rounded">Recargar Energía</button>
            )}
          </div>
        ) : (
          <p>Selecciona una carta para jugar</p>
        )}
      </div>
      <PlayerArea playerId={1} />
    </div>
  );
};

export default Board;