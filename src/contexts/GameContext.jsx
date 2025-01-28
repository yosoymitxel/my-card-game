import React, { createContext, useContext, useReducer } from 'react';

const GameContext = createContext();

const initialState = {
  gameMode: null,
  players: [],
  currentPlayer: 0,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, gameMode: action.mode, players: action.players };
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