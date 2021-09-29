import React, { useEffect, useState } from "react";
import axios from 'axios';

function CreateJoinScreen(props) {
  const [gameIDValue, setGameIDValue] = useState("");
  const [userName, setUserName] = useState("");

  const handleJoinGame = async () => {
    var roundDetails = await axios.post(process.env.REACT_APP_API + "/GetRoundDetails",
    {
      gameID: gameIDValue,
      round: 1
    });
    if (roundDetails.data.isValid === true) {
      props.joinGame(roundDetails.data, userName, gameIDValue);
    }
  }

  const handleCreateGame = () => {
    props.createGame();
  }

  return (
    <div>
    <div>
      <input onChange={e => setUserName(e.target.value)} placeholder="User Name" />
      <input onChange={e => setGameIDValue(e.target.value)} placeholder="Game ID" />
      <button onClick={handleJoinGame}>Join Game</button>
    </div>
    <div>
      <button onClick={handleCreateGame}>Create Game</button>
    </div>
    </div>
  )
}

export default CreateJoinScreen;