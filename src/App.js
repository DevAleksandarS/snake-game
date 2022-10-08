import Board from "./components/Board";
import Score from "./components/Score";
import "./style/style.css";

function App() {
  return (
    <div className="game-container">
      <div className="center">
        <Board />
        <Score />
        <p className="text">Press enter to start or reset</p>
      </div>
    </div>
  );
}

export default App;
