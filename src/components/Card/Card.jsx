import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBolt, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const Card = ({ card }) => {
  if (!card) return null;

  const {
    image = 'https://i.pinimg.com/736x/1b/f3/45/1bf345371069447ff760bfcfd7cf91ba.jpg', // Generic card image
    name = 'Carta Genérica',
    type = 'Desconocido',
    hp,
    attacks = [],
    special_effects = [],
    usage,
    effect
  } = card;

  return (
    <div className={`card ${type}`}>
      <img src={image} alt={name} />
      <div className="overlay">
        <div className="top">
          <span>{type}</span>
          {hp && <span><FontAwesomeIcon icon={faHeart} /> {hp}</span>}
          {usage && <span>{usage}</span>}
        </div>
        <div className="bottom">
          <h3>{name}</h3>
          {attacks.map((attack, index) => (
            <div key={index}>
              <p>{attack.name}</p>
              <p><FontAwesomeIcon icon={faBolt} /> {attack.energy_required}</p>
              <p>Daño: {attack.damage}</p>
              {attack.effect && <p>Efecto: {attack.effect}</p>}
            </div>
          ))}
          {special_effects.length > 0 && (
            <div>
              <h4>Efectos Especiales:</h4>
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
  })
};

export default Card;