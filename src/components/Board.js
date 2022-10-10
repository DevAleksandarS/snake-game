import { useState, useEffect, useImperativeHandle } from "react";
import useInterval from "../custom-hooks/useInterval.js";
import {
  boardFieldsStart,
  snakeHeadStart,
  snakeBodyStart,
  foodStart,
} from "../identifiers/identifiers.js";

function Board({ keyPress }) {
  const [score, setScore] = useState(0);
  const [boardFields, setBoardFields] = useState(boardFieldsStart);
  const [snakeHead, setSnakeHead] = useState(snakeHeadStart);
  const [snakeBody, setSnakeBody] = useState(snakeBodyStart);
  const [food, setFood] = useState(foodStart);
  const [dir, setDir] = useState({ x: 0, y: 1 });

  const checkField = (cell) => {
    if (cell === 0) return "empty-cell";
    if (cell === 1) return "food-cell";
    if (cell === 2) return "snake-cell";
  };

  const snakeMovement = (boardFieldsCopy) => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        boardFieldsCopy[i][j] = 0;
      }
    }
    boardFieldsCopy[snakeHead.x][snakeHead.y] = 2;
    snakeBody.forEach(
      (bodyPart) => (boardFieldsCopy[bodyPart.x][bodyPart.y] = 2)
    );
    snakeBody.forEach((bodyPart, index) => {
      if (index === snakeBody.length - 1) snakeBody[index] = snakeHead;
      if (index !== snakeBody.length - 1)
        snakeBody[index] = snakeBody[index + 1];
      console.log(snakeBody);
    });
    setBoardFields(boardFieldsCopy);
    setSnakeHead({ x: snakeHead.x + dir.x, y: snakeHead.y + dir.y });
  };

  // const foodPosition = (boardFieldsCopy, check) => {
  //   if (check) {
  //     boardFieldsCopy[food.x][food.y] = 0;
  //     setFood({
  //       x: Math.floor(Math.random() * 10),
  //       y: Math.floor(Math.random() * 10),
  //     });
  //   }

  //   boardFieldsCopy[food.x][food.y] = 1;
  //   return boardFieldsCopy;
  // };

  const gameLoop = () => {
    let boardFieldsCopy = boardFields;

    snakeMovement(boardFieldsCopy);

    if (food === snakeHead) {
      boardFieldsCopy[food.x][food.y] = 0;
      setFood({
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      });
      snakeMovement(boardFieldsCopy);
    }
    boardFieldsCopy[food.x][food.y] = 1;
    setBoardFields(boardFieldsCopy);
  };

  useInterval(() => {
    gameLoop();
  }, 500);

  useEffect(() => {
    if (keyPress === "ArrowUp") setDir({ x: -1, y: 0 });
    if (keyPress === "ArrowDown") setDir({ x: 1, y: 0 });
    if (keyPress === "ArrowRight") setDir({ x: 0, y: 1 });
    if (keyPress === "ArrowLeft") setDir({ x: 0, y: -1 });
  }, [keyPress]);

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
