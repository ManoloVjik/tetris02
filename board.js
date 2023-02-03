//it's the board block!

class Board {
    constructor() {
        this.ctx = ctx;
        this.piece = null;
        this.ctxNext = this.ctxNext;    //23.01.2023
        this.pieceNext = null;          //24.01.2023
    }

    // Reset game board at begin an every new game
    reset() {
        this.grid = this.getEmptyBoard();
        this.piece = new Piece(this.ctx);   //////29.01.2023
        this.piece.setStartPosition();      //////29.01.2023
        this.getNewPiece();                 //////29.01.2023
    }

    getNewPiece() {                         //////29.01.2023 whole function of today!
        this.pieceNext = new Piece(this.ctxNext);
        //console.log(ctxNext.canvas.width, ctxNext.canvas.height);
        ctxNext.clearRect(0, 0, ctxNext.canvas.width, ctxNext.canvas.height);
        this.pieceNext.drawNext(); //03.02.2023
    }

    // Create new board matrix with nills
    getEmptyBoard() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }

    // Check up if piece between walls
    insideWalls(x) {
        return x => 0 && x < COLS;
    }

    // Check up if piece above the floor
    aboveFloor(y) {
        return y <= ROWS;
    }

    // Check up if cells are not occupied other pieces
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
        //console.log(this.piece.color);
        this.piece.draw();
        this.drawBoard();
        //ctxNext.piece.draw();
    }

    //drawNext() {      //24.01.2023
        //ctxNext.piece.draw();
    //}

    drawBoard() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value - 1];
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
            //console.table(this.grid);

            if (this.piece.y === 0) {
                // GAME OVER
                return false;
            }

            //this.piece = new Piece(this.ctx);     //24.01.2023
            //this.pieceNext = new Piece(this.ctxNext);
            this.piece = this.pieceNext;
            this.piece.ctx = this.ctx;
            this.piece.setStartPosition();
            //this.pieceNext.draw(this.ctxNext);

            this.pieceNext.drawNext(this.ctxNext); ////29.01.2023
            this.getNewPiece();
            
        }
        return true; // Game is longing
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

    getLineClearedPoints(lines, level) {     //23.01.2023
        const linesClearPoints =
            lines === 1 
                ? POINTS.SINGLE 
                : lines === 2 
                ? POINTS.DOUBLE 
                : lines === 3 
                ? POINTS.TRIPLE 
                : lines === 4 
                ? POINTS.TETRIS 
                : 0;
        
        return (level + 1) * linesClearPoints;
    }

    clearLines() { //22.01.2023
        let lines = 0;

        this.grid.forEach((row, y) => {
            // if all cells in the row are full
            if (row.every(value => value > 0)) {
                lines++;
                
                //to delete this row
                this.grid.splice(y, 1);
                // to add new lines to game board
                //account.lines += 1;  //23.01.2023

                // to add one empty row on the top of the grid
                this.grid.unshift(Array(COLS).fill(0));
            }
        });

        if (lines > 0) {    //23.01.2023
            // Add score of clear lines
            ////console.log('this.lines', lines, 'this.level ', account.level, 'acc.level ', account.level);
            ////console.log(this.getLineClearedPoints(lines, account.level)); //this.level));
            account.score += this.getLineClearedPoints(lines, account.level); //this.level); //this.level);   //account.level
            account.lines += lines;

            // If we complete enough lines for Level complete, to go to the next Level
            if (account.lines >= LINES_PER_LEVEL) {
                // turn up the level
                account.level++;
                // reset lines counter
                account.lines -= LINES_PER_LEVEL;
                // turn up the speed
                time.level = LEVEL[account.level];
            }
        }
    }

    
    
}