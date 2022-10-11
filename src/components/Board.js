import { useState, useEffect } from "react";
import useInterval from "../custom-hooks/useInterval.js";
import {
  boardFieldsStart,
  snakeHeadStart,
  snakeBodyStart,
  foodStart,
} from "../identifiers/identifiers.js";

function Board({ keyPress, scoreValue }) {
  const [score, setScore] = useState(0);
  const [boardFields, setBoardFields] = useState(boardFieldsStart);
  const [snakeHead, setSnakeHead] = useState(snakeHeadStart);
  const [snakeBody, setSnakeBody] = useState(snakeBodyStart);
  const [food, setFood] = useState(foodStart);
  const [dir, setDir] = useState({ x: 0, y: 1 });
  const [speed, setSpeed] = useState(null);
  const [errCatch, setErrCatch] = useState("");

  const checkField = (cell) => {
    if (cell === 0) return "empty-cell";
    if (cell === 1) return "food-cell";
    if (cell === 2) return "snake-cell";
  };

  const snakeMovement = (boardFieldsCopy) => {
    boardFieldsCopy[snakeHead.x][snakeHead.y] = 2;
    snakeBody.forEach(
      (bodyPart) => (boardFieldsCopy[bodyPart.x][bodyPart.y] = 2)
    );
    snakeBody.forEach((bodyPart, index) => {
      if (index === snakeBody.length - 1) snakeBody[index] = snakeHead;
      if (index !== snakeBody.length - 1)
        snakeBody[index] = snakeBody[index + 1];
    });
    setBoardFields(boardFieldsCopy);
    setSnakeHead({ x: snakeHead.x + dir.x, y: snakeHead.y + dir.y });
  };

  const increaseSnakeBody = () => {
    setSnakeBody([...snakeBody, { x: food.x, y: food.y }]);
  };

  const foodPosition = (boardFieldsCopy) => {
    if (food.x === snakeHead.x && food.y === snakeHead.y) {
      increaseSnakeBody();
      setFood({
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      });
    }
    boardFieldsCopy[food.x][food.y] = 1;
  };

  const gameOver = (boardFieldsCopy) => {
    const snakeBiteItSelfCheck = () => {
      for (let i = 0; i < snakeBody.length - 3; i++) {
        if (snakeBody[i].x === snakeHead.x && snakeBody[i].y === snakeHead.y)
          return true;
      }

      return false;
    };

    if (
      errCatch !== "" ||
      snakeHead.y < 0 ||
      snakeHead.y > boardFields.length - 1 ||
      snakeBiteItSelfCheck()
    ) {
      setSnakeHead(null);
      setSpeed(null);
    }
  };

  const startGame = () => {
    setScore(0);
    setBoardFields(boardFieldsStart);
    setSnakeHead(snakeHeadStart);
    setSnakeBody([
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ]);
    setFood(foodStart);
    setDir({ x: 0, y: 1 });
    setSpeed(200);
    setErrCatch("");
  };

  const gameLoop = () => {
    let boardFieldsCopy = new Array(10)
      .fill(0)
      .map((row) => new Array(10).fill(0));

    foodPosition(boardFieldsCopy);

    try {
      snakeMovement(boardFieldsCopy);
    } catch (err) {
      setErrCatch(err);
    } finally {
      gameOver(boardFieldsCopy);
    }

    setBoardFields(boardFieldsCopy);

    setScore(parseInt(snakeBody.length) - 2);
    scoreValue(score);
  };

  useInterval(() => {
    gameLoop();
  }, speed);

  useEffect(() => {
    if (keyPress === "Enter") startGame();
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
