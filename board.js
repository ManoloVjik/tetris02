//it's the board block!

class Board {
    constructor() {
        this.ctx = ctx;
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

    draw() {
        console.log(this.piece.color);
        this.piece.draw();
        this.drawBoard();
    }

    drawBoard() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value];
                    this.ctx.fillRect(x, y, 1, 1);
                }
            });
        });
    }

    drop() {
        let p = moves[KEY.DOWN](this.piece);
        if (this.valid(p)) {
            this.piece.move(p);
        } else {
            this.freeze();
            this.clearLines(); //22.01.2023
            console.table(this.grid);

            this.piece = new Piece(this.ctx);
            this.piece.setStartPosition();
        }
    }

    freeze() {
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            });
        });
    }

    clearLines() { //22.01.2023
        let lines = 0;

        this.grid.forEach((row, y) => {
            // if all cells in the row are full
            if (row.every(value => value > 0)) {
                lines++;
                
                //to delete this row
                this.grid.splice(y, 1);

                // to add one empty row on the top of the grid
                this.grid.unshift(Array(COLS).fill(0));
            }
        });
    }
    
}