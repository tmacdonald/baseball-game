import React, { useState } from "react";
import Game from "./components/Game";

function App() {
  const [games, setGames] = useState([<Game key={0} />]);

  function addGame() {
    setGames([...games, <Game key={games.length} />]);
  }

  return (
    <div className="App">
      {games}
      <button onClick={addGame}>Add Game</button>
    </div>
  );
}

export default App;
