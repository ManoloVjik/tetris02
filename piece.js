// it's piece block!
class Piece {
    constructor(ctx) {
        this.ctx = ctx;
        this.spawn();
    }

    draw() {
        //console.log(this.color, this.typeId);
        //this.ctx.fillStyle = this.color;
        ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                // this.x, this.y - left up corner of shape on game board
                // x, y - coordinates of the cell around shape matrix
                // this.x + x - coordinate of the cell on game board
                if (value > 0 ) {
                    //this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                    ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    drawNext() {      //24.01.2023
        //console.log('it is a drawNext!');
        //this.ctxNext.fillStyle = this.color;
        //context.clearRect(0, 0, canvasNext.width, canvasNext.height);
        ctxNext.fillStyle = this.color;
        //console.log('next ', this.color);
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                // this.x, this.y - left up corner of shape on game board
                // x, y - coordinates of the cell around shape matrix
                // this.x + x - coordinate of the cell on game board
                if (value > 0 ) {
                    ctxNext.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    move(p) {
        this.x = p.x;        
        this.y = p.y;
        //this.shape = p.shape; /////
    }

    // noOfTypes parameter it's quontity of variants
    randomizeTetraminoType(noOfTypes) {
        return Math.floor(Math.random() * noOfTypes);
    }

    spawn() {   // Spawn a new shape on the game board
        this.typeId = this.randomizeTetraminoType(COLORS.length);
        this.shape = SHAPES[this.typeId];
        this.color = COLORS[this.typeId];
        this.x = 0;
        this.y = 0;
    }

    // Set new shape in the middle of the board up-side
    setStartPosition() {
        this.x = this.typeId === 4 ? 4 : 3;
    }

    
}