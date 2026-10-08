const gameState = {
    sequence: [],
    playerSequence: [],
    isShowing: false,
    isGameOver: true,
    level: 0,
    best: Number(localStorage.getItem('simonBest')) || 0
};

const startBtn = document.getElementById('startBtn');
const statusDiv = document.getElementById('status');
const levelValue = document.getElementById('levelValue');
const bestValue = document.getElementById('bestValue');
const sectors = document.querySelectorAll('.sector');

const SHOW_DELAY = 620;
const ACTIVE_DURATION = 400;
const START_DELAY = 500;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function setStatus(text, type = '') {
    statusDiv.textContent = text;
    statusDiv.className = 'status' + (type ? ' ' + type : '');
}

function updateStats() {
    levelValue.textContent = gameState.level;
    bestValue.textContent = gameState.best;
}

function flashSector(index, duration = ACTIVE_DURATION) {
    const sector = sectors[index];
    if (!sector) return;
    sector.classList.add('active');
    setTimeout(() => sector.classList.remove('active'), duration);
}

let audioCtx = null;
function playTone(index) {
    try {
        if (!audioCtx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return;
            audioCtx = new AC();
        }
        const freqs = [329.63, 261.63, 392.00, 220.00];
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freqs[index] || 440;
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        const now = audioCtx.currentTime;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.15, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
    } catch (_) { /* звук не критичен */ }
}

function nextRound() {
    gameState.level++;
    gameState.playerSequence = [];
    gameState.sequence.push(Math.floor(Math.random() * 4));

    updateStats();
    setStatus('Watch carefully...', 'active');

    playSequence();
}

async function playSequence() {
    gameState.isShowing = true;
    await delay(START_DELAY);

    for (let i = 0; i < gameState.sequence.length; i++) {
        const idx = gameState.sequence[i];
        flashSector(idx);
        playTone(idx);
        await delay(SHOW_DELAY);
    }

    gameState.isShowing = false;
    setStatus('Your turn!', 'active');
}

function handleSectorClick(event) {
    if (gameState.isShowing || gameState.isGameOver) return;

    const index = parseInt(event.currentTarget.dataset.id, 10);
    flashSector(index);
    playTone(index);
    gameState.playerSequence.push(index);

    checkInput();
}

function checkInput() {
    const step = gameState.playerSequence.length - 1;
    const expected = gameState.sequence[step];
    const actual = gameState.playerSequence[step];

    if (expected !== actual) {
        gameOver();
        return;
    }

    if (gameState.playerSequence.length === gameState.sequence.length) {
        gameState.isShowing = true;
        setStatus('Correct! Next round...', 'active');
        setTimeout(() => {
            gameState.isShowing = false;
            nextRound();
        }, 900);
    }
}

function gameOver() {
    gameState.isGameOver = true;
    gameState.isShowing = false;

    if (gameState.level > gameState.best) {
        gameState.best = gameState.level;
        localStorage.setItem('simonBest', String(gameState.best));
    }

    updateStats();
    setStatus(`Game over! You reached level ${gameState.level}`, 'error');
    startBtn.disabled = false;
    startBtn.querySelector('span').textContent = 'RESTART';
}

function startGame() {
    gameState.sequence = [];
    gameState.playerSequence = [];
    gameState.level = 0;
    gameState.isGameOver = false;
    gameState.isShowing = true;

    startBtn.disabled = true;
    startBtn.querySelector('span').textContent = 'PLAYING';
    updateStats();
    setStatus('Get ready...', 'active');

    setTimeout(() => {
        gameState.isShowing = false;
        nextRound();
    }, 600);
}

sectors.forEach(sector => {
    sector.addEventListener('click', handleSectorClick);
});

startBtn.addEventListener('click', startGame);

updateStats();