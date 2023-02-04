// it's mine block!
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Set size of canvas
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Set a scale
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// Set new Canvas for next shape //24.01.2023
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');
// Set size of canvasNext
ctxNext.canvas.width = 4 * BLOCK_SIZE;
ctxNext.canvas.height = 4* BLOCK_SIZE;
ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);

//let board = new Board(ctx);

let board = new Board(ctx, ctxNext); 

const time = {start: 0, elapsed: 0, level: 1000};

let accountValues = {   //23.01.2023
    score: 0,
    lines: 0,
    level: 0
}

// renew data set on the screen with HTML   //23.01.2023
function updateAccount(key, value) {
    let element = document.getElementById(key);
    if (element) {
        element.textContent = value;
    }
}
// Proxi of acsess of (accountValues) properties
let account = new Proxy(accountValues, {
    set: (target, key, value) => {
        target[key] = value;
        updateAccount(key, value);
        return true;
    }
});

let requestId;

function gameOver() {
    cancelAnimationFrame(requestId);
    ctx.fillStyle = 'black';
    ctx.fillRect(1, 3, 8, 1.2);
    ctx.font = '1px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', 1.8, 4);

    //newScore.level = account.level;
    checkHighScore(account.score);  //04.02.2023
}

function animate(now = 0) {
    // Renew elapsed time
    time.elapsed = now - time.start;

    // If time of draw this frame is empty
    if (time.elapsed > time.level) {
        // Let begin a new time
        time.start = now;

        if (!board.drop()) {
            gameOver();
            return;
        }
    }

    // Erase the board for new shape draw
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Let new draw the game board
    board.draw();  
    requestId = requestAnimationFrame(animate);
}

function play() {
    resetGame();     //23.01.2023
    //console.table(board.grid); // a pretty look of game board by matrix view
    animate();
}

const moves = {
    [KEY.LEFT]: p => ({ ...p, x: p.x - 1}),
    [KEY.RIGHT]: p => ({ ...p, x: p.x +1}),
    [KEY.DOWN]: p => ({ ...p, y: p.y + 1}),
    [KEY.SPACE]: p => ({ ...p, y: p.y + 1}),
    [KEY.UP]: (p) => board.rotate(p)
};

function resetGame() {
    account.score = 0;
    account.lines = 0;
    account.level = 0;
    board.reset();
    let piece = new Piece(ctx);
    board.piece = piece;
    board.piece.setStartPosition();
}



document.addEventListener('keydown', event => {
    if (moves[event.key]) {  
        // отмена действия по умолчанию
        event.preventDefault();
        //console.log('key = ', event.key);        

        // Get new coordinates of shape
        let p = moves[event.key](board.piece);        

        if (event.key === KEY.SPACE) {
            // Drop dawn shape by Space Key was pressed - Hard Drop!
            while (board.valid(p)) {
                account.score += POINTS.HARD_DROP;  //23.01.2023
                board.piece.move(p);

                // Erace the old look of shape on the canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            board.piece.draw();

            p = moves[KEY.DOWN](board.piece);
            }
        } else if (board.valid(p)) {   
            // Check up a new position of shape
            // Real move a shape, if a new position is possible
            board.piece.move(p);

            if (event.key === KEY.DOWN) {   //23.01.2023
                account.score += POINTS.SOFT_DROP;
            }

            // Erace the old look of shape on the canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            board.piece.draw();
        }
    }
});