import { Game } from './Game.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas         = document.getElementById('gameCanvas');
    const scoreEl        = document.getElementById('score');
    const highScoreEl    = document.getElementById('highScore');
    const finalScoreEl   = document.getElementById('finalScore');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const restartBtn     = document.getElementById('restartBtn');
    const startScreen    = document.getElementById('startScreen');
    const startBtn       = document.getElementById('startBtn');

    const game = new Game(
        canvas, scoreEl, highScoreEl, finalScoreEl,
        gameOverScreen, restartBtn, startScreen, startBtn
    );
});