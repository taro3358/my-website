export default class Obstacle {
    constructor() {
        // Make obstacle height random
        const possibleHeights = [40, 55, 70];
        this.h = random(possibleHeights);
        this.w = 20;
        this.x = width;
        this.y = height - this.h;
    }

    update(gameSpeed) {
        this.x -= gameSpeed;
    }

    show() {
        fill(83);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }
}
