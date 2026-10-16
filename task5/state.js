import { CONFIG } from './constants.js';

export class GameState {
    constructor() {
        this.reset();
        this.best = Number(localStorage.getItem(CONFIG.STORAGE_KEY)) || 0;
    }

    reset() {
        this.sequence = [];
        this.playerSequence = [];
        this.isShowing = false;
        this.isGameOver = true;
        this.level = 0;
    }

    addStep() {
        this.sequence.push(Math.floor(Math.random() * 4));
    }

    addPlayerInput(index) {
        this.playerSequence.push(index);
    }

    updateBestScore() {
        if (this.level > this.best) {
            this.best = this.level;
            localStorage.setItem(CONFIG.STORAGE_KEY, String(this.best));
        }
    }

    isCorrectInput(step) {
        return this.sequence[step] === this.playerSequence[step];
    }

    isSequenceComplete() {
        return this.playerSequence.length === this.sequence.length;
    }
}