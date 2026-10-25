import { MOVE_INTERVAL, GRID_COUNT } from './constants.js';
import { Snake } from './Snake.js';
import { Apple } from './Apple.js';
import { Renderer } from './Renderer.js';
import { InputHandler } from './InputHandler.js';

export class Game {
    constructor(canvas, scoreEl, highScoreEl, finalScoreEl,
                gameOverScreen, restartBtn, startScreen, startBtn) {

        this.scoreEl = scoreEl;
        this.highScoreEl = highScoreEl;
        this.finalScoreEl = finalScoreEl;
        this.gameOverScreen = gameOverScreen;
        this.startScreen = startScreen;

        this.renderer = new Renderer(canvas);
        this.snake = new Snake(Math.floor(GRID_COUNT / 2), Math.floor(GRID_COUNT / 2));
        this.apple = new Apple();

        this.score = 0;
        this.highScore = 0;
        this.gameOver = false;
        this.gameStarted = false;
        this.lastMoveTime = 0;
        this.animationId = null;

        this._boundRestart = this.restart.bind(this);
        restartBtn.addEventListener('click', this._boundRestart);

        this._boundStart = this.startGame.bind(this);
        startBtn.addEventListener('click', this._boundStart);

        this.input = new InputHandler(this.snake, this._boundRestart);

        this.apple.spawn(this.snake.getOccupiedCells());
        this.renderer.render(this.snake, this.apple);
    }

    startGame() {
        if (this.gameStarted) return;
        this.gameStarted = true;
        this.startScreen.classList.add('hidden');
        this.lastMoveTime = 0;
        this.animationId = requestAnimationFrame((t) => this._loop(t));
    }

    _loop(currentTime) {
        this.update(currentTime);
        this.renderer.render(this.snake, this.apple);
        this.animationId = requestAnimationFrame((t) => this._loop(t));
    }

    update(currentTime) {
        if (this.gameOver || !this.gameStarted) return;

        if (currentTime - this.lastMoveTime >= MOVE_INTERVAL) {
            this.lastMoveTime = currentTime;
            this._step();
        }
    }

    _step() {
        this.snake.move();

        const head = this.snake.head;
        if (this.apple.isAt(head.x, head.y)) {
            this.score++;
            this._updateScore();
            this.snake.grow();
            const ok = this.apple.spawn(this.snake.getOccupiedCells());
            if (!ok) this._endGame();
        } else {
            this.snake.removeTail();
        }

        if (this.snake.checkCollision()) {
            this._endGame();
        }
    }

    _endGame() {
        this.gameOver = true;

        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.highScoreEl.textContent = this.highScore;
        }

        this.finalScoreEl.textContent = this.score;
        this.gameOverScreen.classList.remove('hidden');
    }

    restart() {
        if (this.animationId) cancelAnimationFrame(this.animationId);

        this.snake.reset(Math.floor(GRID_COUNT / 2), Math.floor(GRID_COUNT / 2));
        this.score = 0;
        this.gameOver = false;
        this.gameStarted = true;
        this._updateScore();
        this.gameOverScreen.classList.add('hidden');
        this.startScreen.classList.add('hidden');

        this.apple.spawn(this.snake.getOccupiedCells());
        this.lastMoveTime = 0;
        this.animationId = requestAnimationFrame((t) => this._loop(t));
    }

    _updateScore() {
        this.scoreEl.textContent = this.score;
    }

    destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.input.destroy();
    }
}