const boardFieldsStart = new Array(10)
  .fill(0)
  .map((row) => new Array(10).fill(0));

const snakeHeadStart = { x: 1, y: 3 };
const snakeBodyStart = [
  { x: 1, y: 1 },
  { x: 1, y: 2 },
];

const foodStart = { x: 5, y: 6 };

const score = 0;
const bestScore = 0;

export {
  boardFieldsStart,
  snakeHeadStart,
  snakeBodyStart,
  foodStart,
  score,
  bestScore,
};
