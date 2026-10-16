import { CONFIG } from './constants.js';
import { GameState } from './state.js';
import { GameUI } from './ui.js';

export class SimonGame {
    constructor() {
        this.state = new GameState();
        this.ui = new GameUI();
        this.init();
    }

    init() {
        this.ui.updateStats(this.state.level, this.state.best);
        this.ui.onStartClick(() => this.startGame());
        this.ui.onSectorClick((event) => this.handleSectorClick(event));
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async startGame() {
        this.state.reset();
        this.state.isGameOver = false;
        this.state.isShowing = true;

        this.ui.setStartButton(false, 'PLAYING');
        this.ui.updateStats(this.state.level, this.state.best);
        this.ui.setStatus('Get ready...', 'active');

        await this.delay(CONFIG.START_GAME_DELAY);

        this.state.isShowing = false;
        this.nextRound();
    }

    async nextRound() {
        this.state.level++;
        this.state.playerSequence = [];
        this.state.addStep();

        this.ui.updateStats(this.state.level, this.state.best);
        this.ui.setStatus('Watch carefully...', 'active');

        await this.playSequence();
    }

    async playSequence() {
        this.state.isShowing = true;
        await this.delay(CONFIG.START_DELAY);

        for (let i = 0; i < this.state.sequence.length; i++) {
            const idx = this.state.sequence[i];
            this.ui.flashSector(idx);
            await this.delay(CONFIG.SHOW_DELAY);
        }

        this.state.isShowing = false;
        this.ui.setStatus('Your turn!', 'active');
    }

    handleSectorClick(event) {
        if (this.state.isShowing || this.state.isGameOver) return;

        const index = parseInt(event.currentTarget.dataset.id, 10);
        this.ui.flashSector(index);
        this.state.addPlayerInput(index);

        this.checkInput();
    }

    checkInput() {
        const step = this.state.playerSequence.length - 1;

        if (!this.state.isCorrectInput(step)) {
            this.gameOver();
            return;
        }

        if (this.state.isSequenceComplete()) {
            this.state.isShowing = true;
            this.ui.setStatus('Correct! Next round...', 'active');
            setTimeout(() => {
                this.state.isShowing = false;
                this.nextRound();
            }, CONFIG.NEXT_ROUND_DELAY);
        }
    }

    gameOver() {
        this.state.isGameOver = true;
        this.state.isShowing = false;
        this.state.updateBestScore();

        this.ui.updateStats(this.state.level, this.state.best);
        this.ui.setStatus(`Game over! You reached level ${this.state.level}`, 'error');
        this.ui.setStartButton(true, 'RESTART');
    }
}