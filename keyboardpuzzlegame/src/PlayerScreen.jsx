import React, { useEffect, useState } from "react";

function PlayerKey(props) {
  return (
    <span className={`key ${props.selected == true ? "selected" : ""}`}>{props.letter}</span>
  )
}


function PlayerScreen() {
  const [keySelection, setKeySelection] = useState();
  const [submitKeys, setSubmitKeys] = useState();
  const letters = "FASDOFJIASODFJAOSDFIJASOIFJ".split("");

  const keyboardRow1 = "QWERTYUIOP".split("");
  const keyboardRow2 = "ASDFGHJKL".split("");
  const keyboardRow3 = "ZXCVBNM".split("");
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const handleNext = async () => {
    for (var i = 0; i<letters.length; i++) {
      setKeySelection(letters[i]);
      await delay(600);
    }
  }

  const handleSubmit = () => {

  }

  return (
<div>

<h1>Round 1</h1>

<div class="keyboard">
  <div class="keyboardRow">
    {keyboardRow1.map((letter) => {
      return <PlayerKey letter={letter} selected={keySelection === letter} />
    })}
  </div>
  <div class="keyboardRow">   
  {keyboardRow2.map((letter) => {
      return <PlayerKey letter={letter} selected={keySelection === letter} />
    })}
  </div>
  <div class="keyboardRow">
  {keyboardRow3.map((letter) => {
      return <PlayerKey letter={letter} selected={keySelection === letter} />
    })}
  </div>
</div>

<div class="input">
<input type="text" onChange={e => setKeySelection(e.target.value)} />
<button class="submit-guess" onClick={handleSubmit}>Submit</button>
<button onClick={handleNext}>Next</button>
</div>
</div>
  );
}

export default PlayerScreen;