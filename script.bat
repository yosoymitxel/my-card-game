@echo off
REM Script para renombrar archivos a .jsx y ajustar estructura

REM Renombrar archivos principales
rename src\index.js main.jsx
rename src\App.js App.jsx

REM Renombrar componentes
cd src\components\Card
rename Card.js Card.jsx
cd ..\..\..

cd src\components\Board
rename Board.js Board.jsx
cd ..\..\..

cd src\components\PlayerArea
rename PlayerArea.js PlayerArea.jsx
cd ..\..\..

cd src\components\GameModeSelector
rename GameModeSelector.js GameModeSelector.jsx
cd ..\..\..

cd src\contexts
rename GameContext.js GameContext.jsx
cd ..\..

cd src\utils
rename gameLogic.js gameLogic.jsx
rename typeChart.js typeChart.jsx
cd ..\..

echo ¡Archivos renombrados correctamente!
pause