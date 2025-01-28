export const drawInitialHand = (deck, handSize = 5) => {
  if (!deck || deck.length === 0) {
    return [];
  }
  return deck.slice(0, handSize);
};

export const applySpecialEffects = (card, gameState) => {
    if (card.effects.includes('high_energy_damage')) {
        gameState.opponent.hp -= 10;
    }
    if (card.effects.includes('reduce_opponent_energy')) {
        gameState.opponent.energy = Math.max(gameState.opponent.energy - 1, 0);
    }
    if (card.effects.includes('heal_ally')) {
        const target = gameState.allies.find(ally => ally.hp < ally.maxHp);
        if (target) {
            target.hp = Math.min(target.hp + 30, target.maxHp);
        }
    }
};

export const calculateDamage = (attack, opponent) => {
    let damage = attack.damage;
    if (attack.effect && attack.effect.includes('Hace +10 de daño si el oponente tiene más de 5 energías.') && opponent.energy > 5) {
        damage += 10;
    }
    return damage;
};

export const applyHealing = (card, target) => {
    if (card.effect && card.effect.includes('Cura 30 puntos de vida a un monstruo aliado.')) {
        target.hp = Math.min(target.hp + 30, target.maxHp);
    }
};

export const rechargeEnergy = (player) => {
    player.energy = Math.min(player.energy + 1, player.maxEnergy);
};

export const initializeDeck = (type, cardsData) => {
  const typeCards = cardsData.cards.filter(card => card.type.toLowerCase() === type.toLowerCase());
  const specialCards = cardsData.cards.filter(card => card.type === 'Especial');
  return [...typeCards.slice(0, 5), ...specialCards.slice(0, 5)];
};

export const dealInitialHand = (deck) => {
  return deck.splice(0, 3);
};