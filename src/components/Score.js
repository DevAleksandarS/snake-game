import { score, bestScore } from "../identifiers/identifiers.js";

function Score() {
  return (
    <div className="score-container">
      <p>Score: {score}</p>
      <p>Best score: {bestScore}</p>
    </div>
  );
}

export default Score;
