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

const COLORS = [    // Colors for  every shapes
    'cyan',         // I
    'blue',         // J
    'orange',       // L
    'khaki',         // O
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

const POINTS = {    // Points of moves, lines and other //23.01.2023
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2
}
Object.freeze(POINTS);

const LINES_PER_LEVEL = 10;     // Levels system
const LEVEL = {
    0: 800,
    1: 720,
    2: 630,
    3: 550,
    4: 480,
    5: 420,
    6: 370,
    7: 340,
    8: 310,
    9: 290,
    10: 280,
    11: 270,
    12: 260,
    13: 250,
    14: 240,
    15: 230,
    16: 210,
    17: 190,
    18: 170,
    19: 150,
    20: 120
}
Object.freeze(LEVEL);

const NO_OF_HIGH_SCORES = 10;
const HIGH_SCORES = 'highScores';

