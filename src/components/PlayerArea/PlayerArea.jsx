import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { useGame } from '../../contexts/GameContext';

const PlayerArea = ({ playerId }) => {
  const { state, dispatch } = useGame();
  const player = state.players?.[playerId];
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

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
      <div className='hidden'>
        {player?.activeCard && <Card card={{ ...player.activeCard, owner: playerId }} isBattlefield />}
      </div>
      <div className="hand flex justify-center items-center mt-4 relative">
        {player?.hand?.filter(card => card && (!player.activeCard || card.name !== player.activeCard.name)).map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card)}
            onMouseEnter={() => setHoveredCardIndex(index)}
            onMouseLeave={() => setHoveredCardIndex(null)}
            className="cursor-pointer absolute"
            style={{
              transform: `rotate(${index * 10 - (player.hand.length - 1) * 5}deg)`,
              transformOrigin: 'bottom center',
              zIndex: hoveredCardIndex === index ? 100 : index,
              marginLeft: `${index * 4}rem`,
              transition: 'transform 0.3s, margin-left 0.3s',
              ...(hoveredCardIndex !== null && hoveredCardIndex !== index && {
                transform: `rotate(${index * 10 - (player.hand.length - 1) * 5}deg) translateX(${hoveredCardIndex < index ? '2rem' : '-2rem'})`
              })
            }}
          >
            <Card card={{ ...card, owner: playerId }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerArea;