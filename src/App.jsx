import React from 'react';
import { GameProvider } from './contexts/GameContext';
import GameModeSelector from './components/GameModeSelector/GameModeSelector';
import Board from './components/Board/Board';
import './App.css';

function App() {
  return (
    <GameProvider>
      <div className="App">
        <GameModeSelector />
        <Board />
      </div>
    </GameProvider>
  );
}

export default App;