import { useState, useEffect, useRef } from "react";
import Board from "./components/Board";
import Score from "./components/Score";
import "./style/style.css";

function App() {
  const [keyPress, setKeyPress] = useState("");

  const keyRef = useRef();

  useEffect(() => {
    keyRef.current.focus();
  }, []);

  return (
    <div
      ref={keyRef}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => setKeyPress(e.key)}
      className="game-container"
    >
      <div className="center">
        <Board keyPress={keyPress} />
        <Score />
        <p className="text">Press enter to start or reset</p>
      </div>
    </div>
  );
}

export default App;
