import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import PlayerScreen from './PlayerScreen';
import DirectorScreen from './DirectorScreen';
import CreateJoinScreen from './CreateJoinScreen';





function App() {
  const [screen, setScreen] = useState(0);
  const [gameDetails,setGameDetails] = useState({});
  const handleJoinGame = (roundDetails, userName, gameID) => {
    setScreen(1);
    setGameDetails({UserName: userName, RoundDetails: roundDetails, GameID: gameID});
  }
  const handleCreateGame = () => {
    setScreen(2);
  }
  return (
    <div>
      {(screen === 0) && <CreateJoinScreen createGame={handleCreateGame} joinGame={handleJoinGame} />}
      {(screen === 1) && <PlayerScreen gameDetails={gameDetails} />}
      {(screen === 2) && <DirectorScreen />}
    </div>
  );
}

export default App;
