import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBolt } from '@fortawesome/free-solid-svg-icons';
import { useGame } from '../../contexts/GameContext';

const Card = ({ card, isBattlefield }) => {
  const { state, dispatch } = useGame();
  const currentPlayer = state.players[state.currentPlayer];
  const opponentPlayer = state.players[1 - state.currentPlayer];
  const [hp, setHp] = useState(card?.hp || 0);

  useEffect(() => {
    if (isBattlefield && card?.hp !== hp) {
      const interval = setInterval(() => {
        setHp((prevHp) => {
          if (prevHp > card.hp) {
            return prevHp - 1;
          } else {
            clearInterval(interval);
            return card.hp;
          }
        });
      }, 50); // Slower animation
    }
  }, [card?.hp, hp, isBattlefield]);

  const handleAttack = (attack) => {
    if (currentPlayer.energy >= attack.energy_required) {
      dispatch({ type: 'ATTACK', attack });
      setTimeout(() => {
        dispatch({ type: 'SWITCH_TURN' });
      }, 500); // Delay to show the animation
    }
  };

  if (!card) return null;

  const {
    image = 'https://i.pinimg.com/736x/1b/f3/45/1bf345371069447ff760bfcfd7cf91ba.jpg', // Generic card image
    name = 'Carta Genérica',
    type = 'Desconocido',
    attacks = [],
    special_effects = [],
    usage,
    effect
  } = card;

  const typeClass = type.toLowerCase();

  return (
    <div className={`card relative border border-gray-300 rounded-lg p-2 m-2 w-48 text-center ${typeClass}`}>
      <img className="w-44 h-64 object-cover rounded-lg" src={image} alt={name} />
      <div className="overlay absolute top-0 left-0 w-full h-full text-white text-xs flex flex-col justify-between p-2 box-border">
        <div className="top flex justify-between bg-black bg-opacity-50 p-1 rounded">
          <span>{type}</span>
          {hp && <span><FontAwesomeIcon icon={faHeart} /> {hp}</span>}
          {usage && <span>{usage}</span>}
        </div>
        <div className="bottom bg-black bg-opacity-50 p-1 rounded text-left">
          <h3 className="text-sm font-bold">{name}</h3>
          <div className="attacks flex flex-wrap justify-between">
            {attacks.map((attack, index) => (
              <div key={index} className="w-full">
                <p className={`attack-button ${isBattlefield && currentPlayer.energy >= attack.energy_required ? 'sufficient-energy' : 'insufficient-energy'}`} onClick={() => isBattlefield && handleAttack(attack)}>
                  <FontAwesomeIcon icon={faBolt} /> {attack.energy_required} | {attack.damage} {attack.name}
                </p>
                {attack.effect && <p>Efecto: {attack.effect}</p>}
              </div>
            ))}
          </div>
          {special_effects.length > 0 && (
            <div>
              <h4 className="font-bold">Efectos Especiales:</h4>
              {special_effects.map((effect, index) => (
                <p key={index}>{effect}</p>
              ))}
            </div>
          )}
          {effect && <p>Efecto: {effect}</p>}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    hp: PropTypes.number,
    attacks: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        damage: PropTypes.number,
        energy_required: PropTypes.number,
        effect: PropTypes.string
      })
    ),
    special_effects: PropTypes.arrayOf(PropTypes.string),
    usage: PropTypes.string,
    effect: PropTypes.string
  }),
  isBattlefield: PropTypes.bool
};

export default Card;