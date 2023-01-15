// it's mine block!
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Set size of canvas
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Set a scale
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

