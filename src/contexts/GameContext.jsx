import React, { createContext, useContext, useReducer } from 'react';
import { drawInitialHand, calculateDamage, rechargeEnergy } from '../utils/gameLogic';
import cardsData from '../data/cards.json';

const GameContext = createContext();

const initialState = {
  gameMode: null,
  players: [
    { id: 0, energy: 0, activeMonster: null, hand: [], deck: [], battlefield: null },
    { id: 1, energy: 0, activeMonster: null, hand: [], deck: [], battlefield: null }
  ],
  currentPlayer: 0,
};

const initializeDeck = (type) => {
  const typeCards = cardsData.cards.filter(card => card.type.toLowerCase() === type.toLowerCase());
  const specialCards = cardsData.cards.filter(card => card.type === 'Especial');
  return [...typeCards.slice(0, 5), ...specialCards.slice(0, 5)];
};

const dealInitialHand = (deck) => {
  return deck.splice(0, 3);
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      const player1Deck = initializeDeck(action.player1Type);
      const player2Deck = initializeDeck(action.player2Type);
      return { 
        ...state, 
        gameMode: action.mode, 
        players: state.players.map((player, index) => ({
          ...player, 
          deck: index === 0 ? player1Deck : player2Deck,
          hand: dealInitialHand(index === 0 ? player1Deck : player2Deck)
        }))
      };
    case 'SWITCH_TURN':
      const currentPlayer = state.currentPlayer;
      const newCard = state.players[currentPlayer].deck.pop();
      return { 
        ...state, 
        currentPlayer: 1 - currentPlayer,
        players: state.players.map((player, index) => 
          index === currentPlayer ? { ...player, hand: [...player.hand, newCard] } : player
        )
      };
    case 'SELECT_CARD':
      return {
        ...state,
        players: state.players.map((player, index) =>
          index === state.currentPlayer ? { 
            ...player, 
            battlefield: action.card,
            hand: player.hand.filter(c => c !== action.card)
          } : player
        )
      };
    case 'ATTACK':
      const { attack } = action;
      const attacker = state.players[state.currentPlayer].battlefield;
      const defender = state.players[1 - state.currentPlayer].battlefield;
      const damage = calculateDamage(attack, defender);
      return {
        ...state,
        players: state.players.map((player, index) =>
          index === 1 - state.currentPlayer ? { 
            ...player, 
            battlefield: { ...player.battlefield, hp: player.battlefield.hp - damage } 
          } : player
        )
      };
    case 'RECHARGE_ENERGY':
      return {
        ...state,
        players: state.players.map((player, index) =>
          index === state.currentPlayer ? { ...player, energy: player.energy + 1 } : player
        )
      };
    case 'PLAY_CARD':
      // Lógica para jugar carta
      return state;
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);