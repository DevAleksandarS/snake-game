import { useState, useEffect } from "react";
import { boardFieldsStart } from "../identifiers/identifiers.js";

function Board() {
  const [boardFields, setBoardFields] = useState(boardFieldsStart);

  const checkField = (cell) => {
    if (cell === 0) return "empty-cell";
    if (cell === 1) return "food-cell";
    if (cell === 2) return "snake-cell";
  };

  useEffect(() => {}, []);

  return (
    <div className="board-container">
      {boardFields?.map((row, rowID) => (
        <div key={rowID} className="row">
          {row.map((cell, cellID) => (
            <div key={cellID} className={`cell ${checkField(cell)}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
