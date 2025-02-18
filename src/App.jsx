// filepath: /c:/Users/Mitxel/Desktop/Proyectos de desarrollo/my-card-game/src/App.jsx
import React from 'react';
import Board from './components/Board/Board';
import GameModeSelector from './components/GameModeSelector/GameModeSelector';
import { GameProvider } from './contexts/GameContext';

const App = () => {
  return (
    <GameProvider>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"></link>
      <div className="App">
        <h1>React Card Game</h1>
        <p>¡Bienvenido al juego de cartas!</p>
        <GameModeSelector />
        <Board />
      </div>
    </GameProvider>
  );
};

export default App;