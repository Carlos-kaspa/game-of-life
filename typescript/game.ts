const TILE_SIZE: number = 20;
let BOARD: boolean[][];
let STAGE = 0;
let GAME_ID = 0;
const RANDOM_ALIVE_PROBABILITY = 0.1;

const canvas = document.querySelector<HTMLCanvasElement>("#game-grid");
const startButton = document.querySelector<HTMLButtonElement>("#start-button");
const pauseButton = document.querySelector<HTMLButtonElement>("#pause-button");
const stopButton = document.querySelector<HTMLButtonElement>("#stop-button");

const pickRandomBoardButton =
  document.querySelector<HTMLButtonElement>("#random-button");
document.querySelector("h1")!.textContent = `Geração ${STAGE}`;

const CELL_HEIGHT = Number(canvas?.height) / Number(TILE_SIZE);
const CELL_WIDTH = Number(canvas?.width) / Number(TILE_SIZE);
const context = canvas?.getContext("2d");

if (context) {
  BOARD = prepareBoard();

  context.fillStyle = "rgb(100, 240, 150)";
  context.strokeStyle = "rgb(90, 90, 90)";
  context.lineWidth = 1;

  // DRAW THE INITIAL BOARD
  drawAll();

  canvas?.addEventListener("click", (e) => {
    const x = Math.floor((e.clientY - canvas.offsetLeft) / TILE_SIZE);
    const y = Math.floor((e.clientX - canvas.offsetTop) / TILE_SIZE);
    // const [x,y] = getCursorPosition(canvas, e)
    console.log(`x => ${x} y => ${y}`);

    BOARD[x][y] = !BOARD[x][y];
    drawAll();
  });

  startButton?.addEventListener("click", () => startGame());

  pauseButton?.addEventListener("click", () => pauseGame());

  stopButton?.addEventListener("click", () => {
    stopGame();
    BOARD = prepareBoard();
    drawAll();
  });

  pickRandomBoardButton?.addEventListener("click", () => {
    BOARD = generateRandomBoard();
    drawAll();
  });
}

function drawBorders() {
  for (let row = 0; row < CELL_WIDTH; row++) {
    context?.beginPath();
    context?.moveTo(row * TILE_SIZE - 0.5, 0);
    context?.lineTo(row * TILE_SIZE - 0.5, Number(canvas?.height));
    context?.stroke();
  }
  for (let col = 0; col < CELL_HEIGHT; col++) {
    context?.beginPath();
    context?.moveTo(0, col * TILE_SIZE - 0.5);
    context?.lineTo(Number(canvas?.width), col * TILE_SIZE - 0.5);
    context?.stroke();
  }
}

function prepareBoard(): boolean[][] {
  const b: boolean[][] = [];
  for (let i = 0; i < CELL_HEIGHT; i++) {
    const row: boolean[] = [];
    for (let j = 0; j < CELL_WIDTH; j++) {
      row.push(false);
    }
    b.push(row);
  }
  return b;
}

function isAlive(x: number, y: number): number {
  if (x < 0 || x >= CELL_HEIGHT || y < 0 || y >= CELL_WIDTH) {
    return 0;
  }
  return BOARD[x][y] ? 1 : 0;
}

function neighboursCount(x: number, y: number): number {
  let count = 0;
  for (let i of [-1, 0, 1]) {
    for (let j of [-1, 0, 1]) {
      if (!(i === 0 && j === 0)) {
        count += isAlive(x + i, y + j);
      }
    }
  }
  return count;
}

function drawBoard() {
  for (let i = 0; i < CELL_WIDTH; i++) {
    for (let j = 0; j < CELL_HEIGHT; j++) {
      if (!isAlive(j, i)) {
        continue;
      }
      context?.fillRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}

function computeNextGeneration() {
  const board = prepareBoard();
  for (let i = 0; i < CELL_HEIGHT; i++) {
    for (let j = 0; j < CELL_WIDTH; j++) {
      if (!isAlive(i, j)) {
        if (neighboursCount(i, j) === 3) {
          board[i][j] = true;
        }
      } else {
        const count = neighboursCount(i, j);
        if (count == 2 || count == 3) {
          board[i][j] = true;
        }
      }
    }
  }
  return board;
}

function clear() {
  context?.clearRect(0, 0, Number(canvas?.width), Number(canvas?.height));
}

function drawAll() {
  clear();
  drawBorders();
  drawBoard();
}

function nextGen() {
  drawAll();
  BOARD = computeNextGeneration();
}

function startGame() {
  if (!GAME_ID) {
    GAME_ID = setInterval(() => {
      nextGen();
      STAGE = STAGE + 1;
      document.querySelector("h1")!.textContent = `Geração ${STAGE}`;
    }, 1000);
  }
}

function pauseGame() {
  clearInterval(GAME_ID);
  GAME_ID = 0;
}

function generateRandomBoard(): boolean[][] {
  const b: boolean[][] = [];
  for (let i = 0; i < CELL_HEIGHT; i++) {
    const row: boolean[] = [];
    for (let j = 0; j < CELL_WIDTH; j++) {
      row.push(Math.random() < RANDOM_ALIVE_PROBABILITY);
    }
    b.push(row);
  }
  STAGE = 0;
  document.querySelector("h1")!.textContent = `Geração ${STAGE}`;

  return b;
}

function stopGame() {
  clearInterval(GAME_ID);
  GAME_ID = 0;
  STAGE = 0;
  document.querySelector("h1")!.textContent = `Geração ${STAGE}`;
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(event.clientX - rect.left / TILE_SIZE);
  const y = Math.floor(event.clientY - rect.top / TILE_SIZE);
  return [x, y];
}
