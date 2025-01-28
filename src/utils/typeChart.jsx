export const typeChart = {
    fire: { strongAgainst: ['grass'], weakAgainst: ['water'] },
    water: { strongAgainst: ['fire'], weakAgainst: ['grass'] },
    grass: { strongAgainst: ['water'], weakAgainst: ['fire'] },
    electric: { strongAgainst: ['water'], weakAgainst: ['ground'] },
    ground: { strongAgainst: ['electric'], weakAgainst: ['water'] }
};

export const checkTypeAdvantage = (attackerType, defenderType) => {
    return typeChart[attackerType]?.strongAgainst?.includes(defenderType);
};

export const calculateDamage = (attacker, defender, currentEnergy) => {
    let damage = attacker.damage;
    if (checkTypeAdvantage(attacker.type, defender.type)) damage += 10;
    return damage;
};