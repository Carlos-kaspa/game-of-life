var TILE_SIZE = 20;
var BOARD;
var STAGE = 0;
var GAME_ID = 0;
var RANDOM_ALIVE_PROBABILITY = 0.1;
var canvas = document.querySelector("#game-grid");
var startButton = document.querySelector("#start-button");
var pauseButton = document.querySelector("#pause-button");
var stopButton = document.querySelector("#stop-button");
var pickRandomBoardButton = document.querySelector("#random-button");
document.querySelector("h1").textContent = "Gera\u00E7\u00E3o ".concat(STAGE);
var CELL_HEIGHT = Number(canvas === null || canvas === void 0 ? void 0 : canvas.height) / Number(TILE_SIZE);
var CELL_WIDTH = Number(canvas === null || canvas === void 0 ? void 0 : canvas.width) / Number(TILE_SIZE);
var context = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
if (context) {
    BOARD = prepareBoard();
    context.fillStyle = "rgb(100, 240, 150)";
    context.strokeStyle = "rgb(90, 90, 90)";
    context.lineWidth = 1;
    // DRAW THE INITIAL BOARD
    drawAll();
    canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("click", function (e) {
        var x = Math.floor((e.clientY - canvas.offsetLeft) / TILE_SIZE);
        var y = Math.floor((e.clientX - canvas.offsetTop) / TILE_SIZE);
        // const [x,y] = getCursorPosition(canvas, e)
        console.log("x => ".concat(x, " y => ").concat(y));
        BOARD[x][y] = !BOARD[x][y];
        drawAll();
    });
    startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener("click", function () { return startGame(); });
    pauseButton === null || pauseButton === void 0 ? void 0 : pauseButton.addEventListener("click", function () { return pauseGame(); });
    stopButton === null || stopButton === void 0 ? void 0 : stopButton.addEventListener("click", function () {
        stopGame();
        BOARD = prepareBoard();
        drawAll();
    });
    pickRandomBoardButton === null || pickRandomBoardButton === void 0 ? void 0 : pickRandomBoardButton.addEventListener("click", function () {
        BOARD = generateRandomBoard();
        drawAll();
    });
}
function drawBorders() {
    for (var row = 0; row < CELL_WIDTH; row++) {
        context === null || context === void 0 ? void 0 : context.beginPath();
        context === null || context === void 0 ? void 0 : context.moveTo(row * TILE_SIZE - 0.5, 0);
        context === null || context === void 0 ? void 0 : context.lineTo(row * TILE_SIZE - 0.5, Number(canvas === null || canvas === void 0 ? void 0 : canvas.height));
        context === null || context === void 0 ? void 0 : context.stroke();
    }
    for (var col = 0; col < CELL_HEIGHT; col++) {
        context === null || context === void 0 ? void 0 : context.beginPath();
        context === null || context === void 0 ? void 0 : context.moveTo(0, col * TILE_SIZE - 0.5);
        context === null || context === void 0 ? void 0 : context.lineTo(Number(canvas === null || canvas === void 0 ? void 0 : canvas.width), col * TILE_SIZE - 0.5);
        context === null || context === void 0 ? void 0 : context.stroke();
    }
}
function prepareBoard() {
    var b = [];
    for (var i = 0; i < CELL_HEIGHT; i++) {
        var row = [];
        for (var j = 0; j < CELL_WIDTH; j++) {
            row.push(false);
        }
        b.push(row);
    }
    return b;
}
function isAlive(x, y) {
    if (x < 0 || x >= CELL_HEIGHT || y < 0 || y >= CELL_WIDTH) {
        return 0;
    }
    return BOARD[x][y] ? 1 : 0;
}
function neighboursCount(x, y) {
    var count = 0;
    for (var _i = 0, _a = [-1, 0, 1]; _i < _a.length; _i++) {
        var i = _a[_i];
        for (var _b = 0, _c = [-1, 0, 1]; _b < _c.length; _b++) {
            var j = _c[_b];
            if (!(i === 0 && j === 0)) {
                count += isAlive(x + i, y + j);
            }
        }
    }
    return count;
}
function drawBoard() {
    for (var i = 0; i < CELL_WIDTH; i++) {
        for (var j = 0; j < CELL_HEIGHT; j++) {
            if (!isAlive(j, i)) {
                continue;
            }
            context === null || context === void 0 ? void 0 : context.fillRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
}
function computeNextGeneration() {
    var board = prepareBoard();
    for (var i = 0; i < CELL_HEIGHT; i++) {
        for (var j = 0; j < CELL_WIDTH; j++) {
            if (!isAlive(i, j)) {
                if (neighboursCount(i, j) === 3) {
                    board[i][j] = true;
                }
            }
            else {
                var count = neighboursCount(i, j);
                if (count == 2 || count == 3) {
                    board[i][j] = true;
                }
            }
        }
    }
    return board;
}
function clear() {
    context === null || context === void 0 ? void 0 : context.clearRect(0, 0, Number(canvas === null || canvas === void 0 ? void 0 : canvas.width), Number(canvas === null || canvas === void 0 ? void 0 : canvas.height));
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
        GAME_ID = setInterval(function () {
            nextGen();
            STAGE = STAGE + 1;
            document.querySelector("h1").textContent = "Gera\u00E7\u00E3o ".concat(STAGE);
        }, 1000);
    }
}
function pauseGame() {
    clearInterval(GAME_ID);
    GAME_ID = 0;
}
function generateRandomBoard() {
    var b = [];
    for (var i = 0; i < CELL_HEIGHT; i++) {
        var row = [];
        for (var j = 0; j < CELL_WIDTH; j++) {
            row.push(Math.random() < RANDOM_ALIVE_PROBABILITY);
        }
        b.push(row);
    }
    STAGE = 0;
    document.querySelector("h1").textContent = "Gera\u00E7\u00E3o ".concat(STAGE);
    return b;
}
function stopGame() {
    clearInterval(GAME_ID);
    GAME_ID = 0;
    STAGE = 0;
    document.querySelector("h1").textContent = "Gera\u00E7\u00E3o ".concat(STAGE);
}
function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = Math.floor(event.clientX - rect.left / TILE_SIZE);
    var y = Math.floor(event.clientY - rect.top / TILE_SIZE);
    return [x, y];
}
