// it's constants block!
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const KEY = {
    LEFT: 'ArrowLeft',      //37,
    RIGHT: 'ArrowRight',    //39,
    DOWN: 'ArrowDown',      //40,
    SPACE: ' ',             //32,
    UP: 'ArrowUp'           //38
}
Object.freeze(KEY);

const COLORS = [    // Colors for every shapes
    'cyan',         // I
    'blue',         // J
    'orange',       // L
    'yellow',       // O
    'green',        // S
    'purple',       // T
    'red'           // Z
];

const SHAPES = [    // Our Shapes matrixes!!!
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],   // I
    [[2, 0, 0], [2, 2, 2], [0, 0, 0]],                          // J
    [[0, 0, 3], [3, 3, 3], [0, 0, 0]],                          // L
    [[4, 4], [4, 4]],                                           // O
    [[0, 5, 5], [5, 5, 0], [0, 0, 0]],                          // S
    [[0, 6, 0], [6, 6, 6], [0, 0, 0]],                          // T
    [[7, 7, 0], [0, 7, 7], [0, 0, 0]]                           // Z
];