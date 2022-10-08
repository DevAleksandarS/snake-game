const boardFieldsStart = new Array(10)
  .fill(0)
  .map((row) => new Array(10).fill(0));

const snakeBodyStart = [
  { x: 1, y: 2 },
  { x: 1, y: 1 },
];

const foodStart = { x: 5, y: 6 };

const score = 0;
const bestScore = 0;

export { boardFieldsStart, snakeBodyStart, foodStart, score, bestScore };
