import React from 'react';
import './Card.css';

const Card = ({ card }) => {
  if (!card) return null;

  return (
    <div className={`card ${card.type}`}>
      <img src={card.image || '/generic-card.jpg'} alt={card.name} />
      <h3>{card.name}</h3>
      <p>Tipo: {card.type}</p>
      {card.health && <p>Vida: {card.health}</p>}
      {card.energyCost && <p>Coste: {card.energyCost}</p>}
      {card.damage && <p>Daño: {card.damage}</p>}
    </div>
  );
};

export default Card;