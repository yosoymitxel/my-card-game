export const drawInitialHand = (deck, handSize = 5) => {
    return deck.slice(0, handSize);
};

export const applySpecialEffects = (card, gameState) => {
    if (card.effects.includes('high_energy_damage')) {
    // Lógica para efecto de alta energía
    }
    // Otros efectos...
};