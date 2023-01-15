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

    insideWalls(x) {
        return x => 0 && x < COLS;
    }

    aboveFloor(y) {
        return y <= ROWS;
    }

    notOccupied(x, y) {     // Check up if cell isn't occupied any pieces
        return this.grid[y] && this.grid[y][x] === 0;
    }

    // Validation of new coordinates on the game board
    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return value === 0 || (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y));
            });
        });
    }

    rotate(p) {
        // Clone the matrix
        let clone = JSON.parse(JSON.stringify(p));

        // Algorithm of rotate - transponing of matrix
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
            }
        }

        // Change columns que
        p.shape.forEach(row => row.reverse());

        return clone;
    }

}