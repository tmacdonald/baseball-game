import React, { useState } from "react";
import Game from "./components/Game";

function App() {
  const [games, setGames] = useState([<Game />]);

  function addGame() {
    setGames([...games, <Game />]);
  }

  return (
    <div className="App">
      {games}
      <button onClick={addGame}>Add Game</button>
    </div>
  );
}

export default App;
