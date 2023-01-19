// it's mine block!
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Set size of canvas
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Set a scale
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let board = new Board();

const time = {start: 0, elapsed: 0, level: 1000};

function animate(now = 0) {
    // Renew elapsed time
    time.elapsed = now - time.start;

    // If time of draw this frame is empty
    if (time.elapsed > time.level) {
        // Let begin a new time
        time.start = now;

        // Move active shape of one step down
        board.drop();  //board.drop();
    }

    // Erase the board for new shape draw
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Let new draw the game board
    board.draw();  
    //board.piece.draw();
    requestAnimationFrame(animate);   //(this.animate.bind(this));
}

function play() {
    board.reset();
    //console.table(board.grid); // a pretty look of game board by matrix view

    let piece = new Piece(ctx);  // Add a new piece (TEMPORARY!!!) - later it will group of pieces
    //piece.draw();

    board.piece = piece;
    board.piece.setStartPosition();
    animate();
}
//play();


const moves = {
    [KEY.LEFT]: p => ({ ...p, x: p.x - 1}),
    [KEY.RIGHT]: p => ({ ...p, x: p.x +1}),
    [KEY.DOWN]: p => ({ ...p, y: p.y + 1}),
    [KEY.SPACE]: p => ({ ...p, y: p.y + 1}),
    [KEY.UP]: (p) => board.rotate(p)
};



document.addEventListener('keydown', event => {
    if (moves[event.key]) {
    //if (moves[KeyboardEvent.key])  {  
        // отмена действия по умолчанию
        event.preventDefault();
        console.log('key = ', event.key);        

        // Get new coordinates of shape
        let p = moves[event.key](board.piece);        

        if (event.key === KEY.SPACE) {
            // Drop dawn shape by Space Key was pressed - Hard Drop!
            while (board.valid(p)) {
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

            // Erace the old look of shape on the canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            board.piece.draw();
        }
    }
});