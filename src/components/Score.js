import { useState } from "react";

function Score({ score }) {
  const [bestScore, setBestScore] = useState(0);

  const checkBestScore = () => {
    if (score > bestScore) setBestScore(score);

    return bestScore;
  };

  return (
    <div className="score-container">
      <p>Score: {score}</p>
      <p>Best score: {checkBestScore()}</p>
    </div>
  );
}

export default Score;
