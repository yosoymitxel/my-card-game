import React, { createContext, useContext, useReducer } from 'react';
import { drawInitialHand } from '../utils/gameLogic';
import cardsData from '../data/cards.json';

const GameContext = createContext();

const initialState = {
  gameMode: null,
  players: [
    { id: 0, energy: 0, activeMonster: null, hand: [] },
    { id: 1, energy: 0, activeMonster: null, hand: [] }
  ],
  currentPlayer: 0,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return { 
        ...state, 
        gameMode: action.mode, 
        players: state.players.map((player, index) => ({
          ...player, 
          hand: drawInitialHand(cardsData.cards.filter(card => card.type.toLowerCase() === cardsData.types[index].toLowerCase()), 10)
        }))
      };
    case 'SWITCH_TURN':
      return { ...state, currentPlayer: 1 - state.currentPlayer };
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