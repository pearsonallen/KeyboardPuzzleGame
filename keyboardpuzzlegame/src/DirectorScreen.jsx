import React, { useEffect, useState } from "react";


function RoundGenerator(props) {
  return (
    <div>
      <input placeholder="Letter Count" />
      <button>Start Next Round</button>
    </div>
  )
}


function DirectorScreen() {
  const [stats, setStats] = useState({
  });
  useEffect(() => {
    const interval = setInterval(() => handleUpdate(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleUpdate = () => {
    setStats({
      gameId: 53,
      roundId: 1,
      expectedValue: "SDFLSKL",
      playerStats: [
        {
          playerName: "Chris Pearson",
          attemptResult: true
        },
        {
          playerName: "Jared Haagen",
          attemptResult: false,
          attemptValue: "SDFSLKL"
        }
      ]
    })
  }
  return (
    <div>
    <RoundGenerator />
    <div>
      <h3>Game ID: {stats.gameId}</h3>
      <h3>Round ID: {stats.roundId}</h3>
      <h5>Expected Letters: {stats.expectedValue}</h5>
      <table>
        { stats.playerStats && 
          stats.playerStats.map((player) => {
            return (
            <tr>
              <td>{player.playerName}</td>
              <td>{player.attemptResult === true 
                ? "Correct" : "Incorrect"}</td>
              <td>{player.attemptValue}</td>
            </tr> )
          })
        }
      </table>
    </div>
    </div>
  );
}

export default DirectorScreen;