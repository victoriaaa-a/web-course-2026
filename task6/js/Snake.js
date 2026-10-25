import { GRID_COUNT, DIR, OPPOSITE_DIR } from './constants.js';

export class Snake {
    constructor(startX, startY) {
        this.reset(startX, startY);
    }

    reset(startX, startY) {
        this.segments = [
            { x: startX,     y: startY },
            { x: startX - 1, y: startY },
            { x: startX - 2, y: startY },
        ];
        this.direction = DIR.RIGHT;
        this.nextDirection = DIR.RIGHT;
    }

    setDirection(newDir) {
        const currentKey = this.direction.x + ',' + this.direction.y;
        const opposite = OPPOSITE_DIR[currentKey];
        if (newDir === opposite) return;
        this.nextDirection = newDir;
    }

    move() {
        this.direction = this.nextDirection;
        const head = this.segments[0];
        const newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y,
        };
        this.segments.unshift(newHead);
    }

    grow() {
    }

    removeTail() {
        this.segments.pop();
    }

    get head() {
        return this.segments[0];
    }

    get length() {
        return this.segments.length;
    }

    checkCollision() {
        const head = this.head;
        if (head.x < 0 || head.x >= GRID_COUNT ||
            head.y < 0 || head.y >= GRID_COUNT) {
            return true;
        }
        for (let i = 1; i < this.segments.length; i++) {
            if (head.x === this.segments[i].x &&
                head.y === this.segments[i].y) {
                return true;
            }
        }
        return false;
    }

    getOccupiedCells() {
        return new Set(this.segments.map(s => `${s.x},${s.y}`));
    }
}