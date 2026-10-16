import { CONFIG } from './constants.js';

export class GameUI {
    constructor() {
        this.startBtn = document.getElementById('startBtn');
        this.startBtnText = this.startBtn.querySelector('span');
        this.statusDiv = document.getElementById('status');
        this.levelValue = document.getElementById('levelValue');
        this.bestValue = document.getElementById('bestValue');
        this.sectors = document.querySelectorAll('.sector');
    }

    updateStats(level, best) {
        this.levelValue.textContent = level;
        this.bestValue.textContent = best;
    }

    setStatus(text, type = '') {
        this.statusDiv.textContent = text;
        this.statusDiv.className = 'status' + (type ? ' ' + type : '');
    }

    flashSector(index, duration = CONFIG.ACTIVE_DURATION) {
        const sector = this.sectors[index];
        if (!sector) return;
        sector.classList.add('active');
        void sector.offsetWidth; // Принудительная перерисовка
        setTimeout(() => sector.classList.remove('active'), duration);
    }

    setStartButton(enabled, text) {
        this.startBtn.disabled = !enabled;
        this.startBtnText.textContent = text;
    }

    onStartClick(handler) {
        this.startBtn.addEventListener('click', handler);
    }

    onSectorClick(handler) {
        this.sectors.forEach(sector => {
            sector.addEventListener('click', handler);
        });
    }
}