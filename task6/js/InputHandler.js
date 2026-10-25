import { DIR } from './constants.js';

export class InputHandler {
    constructor(snake, onRestart) {
        this.snake = snake;
        this.onRestart = onRestart;
        this._boundHandler = this._handleKeyDown.bind(this);
        document.addEventListener('keydown', this._boundHandler);
    }

    _handleKeyDown(event) {
        const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        if (arrowKeys.includes(event.key)) {
            event.preventDefault();
        }

        switch (event.key) {
            case 'ArrowUp':    this.snake.setDirection(DIR.UP);    break;
            case 'ArrowDown':  this.snake.setDirection(DIR.DOWN);  break;
            case 'ArrowLeft':  this.snake.setDirection(DIR.LEFT);  break;
            case 'ArrowRight': this.snake.setDirection(DIR.RIGHT); break;
            case 'r':
            case 'R':
            case 'к':
            case 'К':          this.onRestart(); break;
        }
    }

    destroy() {
        document.removeEventListener('keydown', this._boundHandler);
    }
}