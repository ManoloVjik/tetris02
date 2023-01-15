//it's the board block!

class Board {
    constructor() {
        this.piece = null;
    }

    // Reset game board at begin an every new game
    reset() {
        this.grid = this.getEmptyBoard();
    }

    // Create new board matrix with nills
    getEmptyBoard() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }

    // Validation of new coordinates on the game board
    valid(p) {
        return true;
    }
}