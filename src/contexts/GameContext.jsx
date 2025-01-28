import React, { createContext, useContext, useReducer } from 'react';
import { drawInitialHand, calculateDamage, rechargeEnergy, initializeDeck, dealInitialHand } from '../utils/gameLogic';
import cardsData from '../data/cards.json';

const GameContext = createContext();

const initialState = {
  gameMode: null,
  players: [
    { id: 0, energy: 0, hand: [], usedCards: [], activeCard: null, deck: [], energyRecharged: false },
    { id: 1, energy: 0, hand: [], usedCards: [], activeCard: null, deck: [], energyRecharged: false }
  ],
  currentPlayer: 0,
  error: null,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      const player1Deck = initializeDeck(action.player1Type, cardsData);
      const player2Deck = initializeDeck(action.player2Type, cardsData);
      const newState = { 
        ...state, 
        gameMode: action.mode, 
        players: state.players.map((player, index) => ({
          ...player, 
          deck: index === 0 ? player1Deck : player2Deck,
          hand: dealInitialHand(index === 0 ? player1Deck : player2Deck)
        }))
      };
      console.log('Player 1 hand:', newState.players[0].hand);
      console.log('Player 2 hand:', newState.players[1].hand);
      return newState;
    case 'SWITCH_TURN':
      const currentPlayer = state.currentPlayer;
      const nextPlayer = 1 - currentPlayer;
      const nextPlayerHand = state.players[nextPlayer].hand;
      if (nextPlayerHand.length >= 7) {
        return {
          ...state,
          error: 'No puedes tener más de 7 cartas en la mano.'
        };
      }
      const newCard = state.players[nextPlayer].deck.pop();
      if (!newCard) {
        return {
          ...state,
          error: 'No hay más cartas en el mazo.'
        };
      }
      const updatedState = { 
        ...state, 
        currentPlayer: nextPlayer,
        players: state.players.map((player, index) => 
          index === nextPlayer ? { ...player, hand: [...player.hand, newCard], energyRecharged: false } : player
        ),
        error: null
      };
      console.log('Player 1 hand:', updatedState.players[0].hand);
      console.log('Player 2 hand:', updatedState.players[1].hand);
      return updatedState;
    case 'SELECT_CARD':
      const selectCardState = {
        ...state,
        players: state.players.map((player, index) =>
          index === state.currentPlayer ? { 
            ...player, 
            activeCard: action.card,
            hand: player.hand.filter(c => c.id !== action.card.id)
          } : player
        )
      };
      console.log('Player 1 hand:', selectCardState.players[0].hand);
      console.log('Player 2 hand:', selectCardState.players[1].hand);
      return selectCardState;
    case 'USE_CARD':
      const useCardState = {
        ...state,
        players: state.players.map((player, index) =>
          index === state.currentPlayer ? { 
            ...player, 
            usedCards: [...player.usedCards, action.card],
            hand: player.hand.filter(c => c.id !== action.card.id)
          } : player
        )
      };
      console.log('Player 1 used cards:', useCardState.players[0].usedCards);
      console.log('Player 2 used cards:', useCardState.players[1].usedCards);
      return useCardState;
    case 'RELOAD_HAND':
      const reloadHandState = {
        ...state,
        players: state.players.map((player, index) =>
          index === action.playerId ? { ...player, hand: [...player.hand] } : player
        )
      };
      console.log('Player 1 hand:', reloadHandState.players[0].hand);
      console.log('Player 2 hand:', reloadHandState.players[1].hand);
      return reloadHandState;
    case 'ATTACK':
      const { attack } = action;
      const attacker = state.players[state.currentPlayer].activeCard;
      const defender = state.players[1 - state.currentPlayer].activeCard;
      const damage = calculateDamage(attack, defender);
      const newHp = Math.max(defender.hp - damage, 0);
      return {
        ...state,
        players: state.players.map((player, index) =>
          index === 1 - state.currentPlayer ? { 
            ...player, 
            activeCard: newHp > 0 ? { ...player.activeCard, hp: newHp } : null 
          } : player
        )
      };
    case 'RECHARGE_ENERGY':
      return {
        ...state,
        players: state.players.map((player, index) =>
          index === state.currentPlayer ? { ...player, energy: player.energy + 1, energyRecharged: true } : player
        )
      };
    case 'PLAY_CARD':
      // Lógica para jugar carta
      return state;
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
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