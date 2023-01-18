// it's piece block!
class Piece {
    constructor(ctx) {
        this.ctx = ctx;
        this.color = 'blue';
        this.shape = [
            [2, 0, 0],
            [2, 2, 2],
            [0, 0, 0]
        ];
        this.spawn();
        // Begin position
        this.x = 3;
        this.y = 0;
    }

    

    move(p) {
        this.x = p.x;
        this.y = p.y;
    }

    // parameter noOfTypes - it's quontity of variants
    randomizeTetraminoTypes(noOfTypes) {
        return Math.floor.apply(Math.random() * noOfTypes);
    }
    spawn() {
        this.typeId = this.randomizeTetraminoTypes(COLORS.length -1);
        this.shape = SHAPES[this.typeId];
        this.color = COLORS[this.typeId];
        this.x = 0;
        this.y = 0;
    }

    // Set a shape in the middle of board
    setStartPosition() {
        this.x = this.typeId === 4 ? 4 : 3;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                // this.x, this.y - left up corner of shape on game board
                // x, y - coordinates of the cell around shape matrix
                // this.x + x - coordinate of the cell on game board
                if (value > 0 ) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }
}