export default class Bird {
    constructor() {
        this.w = 30;
        this.h = 20;
        this.x = width;
        
        // Fly at one of two possible heights
        const possibleHeights = [height - 80, height - 110];
        this.y = random(possibleHeights);
    }

    update(gameSpeed) {
        this.x -= gameSpeed;
    }

    show() {
        fill(83);
        noStroke();
        // Simple animation of flapping wings
        if (frameCount % 20 < 10) {
            // Wings up
            rect(this.x, this.y, this.w, this.h / 2);
        } else {
            // Wings down
            rect(this.x, this.y + this.h / 4, this.w, this.h / 2);
        }
    }
}
