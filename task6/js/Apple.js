import { GRID_COUNT } from './constants.js';

export class Apple {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    spawn(occupiedCells) {
        const freeCells = [];

        for (let x = 0; x < GRID_COUNT; x++) {
            for (let y = 0; y < GRID_COUNT; y++) {
                if (!occupiedCells.has(`${x},${y}`)) {
                    freeCells.push({ x, y });
                }
            }
        }

        if (freeCells.length === 0) {
            return false;
        }

        const idx = Math.floor(Math.random() * freeCells.length);
        this.x = freeCells[idx].x;
        this.y = freeCells[idx].y;
        return true;
    }

    isAt(x, y) {
        return this.x === x && this.y === y;
    }
}