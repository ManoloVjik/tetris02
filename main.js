// it's mine block!
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Set size of canvas
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Set a scale
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let board = new Board();

function play() {
    board.reset();
    console.table(board.grid); // a pretty look of game board by matrix view

    let piece = new Piece(ctx);
    piece.draw();

    board.piece = piece;
}

const moves = {
    [KEY.LEFT]: p => ({ ...p, x: p.x - 1}),
    [KEY.RIGHT]: p => ({ ...p, x: p.x +1}),
    [KEY.DOWN]: p => ({ ...p, y: p.y + 1})
};

document.addEventListener('keydown', event => {
    if (moves[event.code]) {
    //if (moves[KeyboardEvent.key])  {  
        // отмена действия по умолчанию
        event.preventDefault();
        console.log(event.key);

        // Get new coordinates of shape
        let p = moves[event.code](board.piece);

        // Check up a new position of shape
        if (board.valid(p)) {
            // Real move a shape, if a new position is possible
            board.piece.move(p);

            // Erace the old look of shape on the canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            board.piece.draw();
        }
    }
});