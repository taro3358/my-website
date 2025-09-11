export default class Dino {
    constructor() {
        this.r = 40; // radius/size
        this.x = this.r;
        this.y = height - this.r;
        this.vy = 0;
        this.gravity = 0.8;
        this.jumpsLeft = 0;
        this.invincible = false;
        this.invincibleTimer = 0;
    }

    jump() {
        if (this.jumpsLeft > 0) {
            this.vy = -15; // Lower jump height
            this.jumpsLeft--;
        }
    }

    hits(obstacle) {
        return (
            this.x + this.r > obstacle.x &&
            this.x < obstacle.x + obstacle.w &&
            this.y + this.r > obstacle.y &&
            this.y < obstacle.y + obstacle.h
        );
    }

    update() {
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, height - this.r);

        // Reset jumps when on the ground
        if (this.y === height - this.r) {
            this.jumpsLeft = 2;
        }

        if (this.invincible) {
            this.invincibleTimer--;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
            }
        }
    }

    show() {
        if (this.invincible && frameCount % 10 < 5) {
            // Blinking effect when invincible
            // Do nothing (don't draw)
        } else {
            fill(83);
            noStroke();
            rect(this.x, this.y, this.r, this.r);
        }
    }
}
