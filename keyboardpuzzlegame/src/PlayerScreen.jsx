import React, { useState } from "react";
import axios from 'axios';

function PlayerKey(props) {
  return (
    <span className={`key ${props.selected === true ? "selected" : ""}`}>{props.letter}</span>
  )
}

function PlayerScreen(props) {
  const [roundID, setRoundID] = useState(0);
  const [keySelection, setKeySelection] = useState();
  const [expectedLetters, setExpectedLetters] = useState("");
  const [status, setStatus] = useState(0);

  const getRoundDetails = async () => {
    var roundDetails = await axios.post(process.env.REACT_APP_API + "/GetRoundDetails",
    {
      gameID: props.GameID,
      round: {roundID}
    });
    return roundDetails.data;
  } 

  const keyboardRow1 = "QWERTYUIOP".split("");
  const keyboardRow2 = "ASDFGHJKL".split("");
  const keyboardRow3 = "ZXCVBNM".split("");
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const handleNext = async () => {
    var roundDetails;
    if (status === 0) {
      roundDetails = await getRoundDetails();
    } else if (status === 2) {
      roundDetails = await getRoundDetails({roundID} + 1);
    } else {
      return;
    }
    
    setRoundID(roundDetails.roundId);
    var letters = roundDetails.letters;
    setExpectedLetters(letters);
    for (var i = 0; i<letters.length; i++) {
      setKeySelection(letters[i]);
      await delay(600);
    }
  }

  const handleSubmit = () => {
    if (keySelection !== expectedLetters) {
      setStatus(1);
    } else {
      setStatus(2);
    }
  }

  const statusValue = () => {
    switch (status) {
      case 0:
        return "";
        break;
      case 1:
        return "Wrong";
        break;
      case 2:
        return "Correct!";
        break;
      default:
        return "";
        break;
    }
  }

  return (
<div>

<h1>Round {roundID}</h1>

<div className="keyboard">
  <div className="keyboardRow">
    {keyboardRow1.map((letter, i) => {
      return <PlayerKey key={i} letter={letter} selected={keySelection === letter} />
    })}
  </div>
  <div className="keyboardRow">   
  {keyboardRow2.map((letter, i) => {
      return <PlayerKey key={i} letter={letter} selected={keySelection === letter} />
    })}
  </div>
  <div className="keyboardRow">
  {keyboardRow3.map((letter, i) => {
      return <PlayerKey key={i} letter={letter} selected={keySelection === letter} />
    })}
  </div>
</div>

<div className="input">
<input type="text" onChange={e => setKeySelection(e.target.value)} />
<button className="submit-guess" onClick={handleSubmit}>Submit</button>
<span>{statusValue()}</span>
<button className="next-round" onClick={handleNext}>Next</button>
</div>
</div>
  );
}

export default PlayerScreen;