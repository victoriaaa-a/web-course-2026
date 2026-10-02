const state = {
    secretNumber: '',
    attempts: 0,
    history: [],
    isGameOver: false
};

// DOM элементы
const guessInput = document.getElementById('guess-input');
const checkBtn = document.getElementById('check-btn');
const newGameBtn = document.getElementById('new-game-btn');
const messageEl = document.getElementById('message');
const attemptsCountEl = document.getElementById('attempts-count');
const historyListEl = document.getElementById('history-list');

// 1. Функция генерации загаданного числа
function generateSecretNumber() {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let secret = '';
    
    // Выбираем 4 уникальные цифры
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        secret += digits[randomIndex];
        digits.splice(randomIndex, 1); // Удаляем выбранную цифру, чтобы не повторялась
    }
    
    return secret;
}


// 2. Функция валидации ввода
function validateInput(input) {
    // Проверка на длину
    if (input.length !== 4) {
        return { isValid: false, error: 'Нужно ввести ровно 4 цифры.' };
    }
    
    // Проверка, что все символы - цифры
    if (!/^\d+$/.test(input)) {
        return { isValid: false, error: 'Можно вводить только цифры (без букв и символов).' };
    }
    
    // Проверка на уникальность цифр
    const uniqueDigits = new Set(input);
    if (uniqueDigits.size !== 4) {
        return { isValid: false, error: 'Все цифры должны быть разными.' };
    }
    
    return { isValid: true, error: null };
}

// 3. Функция подсчета быков и коров
function countBullsAndCows(secret, guess) {
    let bulls = 0;
    let cows = 0;
    
    for (let i = 0; i < 4; i++) {
        if (guess[i] === secret[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }
    
    return { bulls, cows };
}

// Функции отрисовки интерфейса
function renderHistory() {
    historyListEl.innerHTML = '';
    
    // Рендерим из массива данных
    state.history.forEach(record => {
        const li = document.createElement('li');
        
        const guessSpan = document.createElement('span');
        guessSpan.textContent = record.guess;
        
        const resultSpan = document.createElement('span');
        let resultText = `${record.bulls} бык., ${record.cows} кор.`;
        if (record.bulls === 4) {
            resultText = 'ПОБЕДА!';
            resultSpan.style.color = '#27ae60';
            resultSpan.style.fontWeight = 'bold';
        }
        resultSpan.textContent = resultText;
        
        li.appendChild(guessSpan);
        li.appendChild(resultSpan);
        historyListEl.appendChild(li);
    });
}

function updateAttempts() {
    attemptsCountEl.textContent = state.attempts;
}

function showMessage(text, type = 'info') {
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
}


// Основная логика игры
function handleCheck() {
    if (state.isGameOver) return;
    
    const userGuess = guessInput.value.trim();
    const validation = validateInput(userGuess);
    
    // Если валидация не пройдена
    if (!validation.isValid) {
        showMessage(validation.error, 'error');
        return;
    }
    
    // Валидация пройдена, считаем результат
    const { bulls, cows } = countBullsAndCows(state.secretNumber, userGuess);
    
    // Увеличиваем счетчик попыток
    state.attempts++;
    updateAttempts();
    
    // Добавляем запись в историю
    state.history.push({
        guess: userGuess,
        bulls: bulls,
        cows: cows
    });
    
    // Перерисовываем историю
    renderHistory();
    
    // Очищаем поле ввода
    guessInput.value = '';
    
    // Проверяем условие победы
    if (bulls === 4) {
        state.isGameOver = true;
        showMessage(`Победа! Угадано за ${state.attempts} попыток!`, 'success');
        guessInput.disabled = true;
        checkBtn.disabled = true;
    } else {
        showMessage(`Результат: ${bulls} бык., ${cows} кор.`, 'info');
        guessInput.focus();
    }
}

function startNewGame() {
    // Сброс состояния
    state.secretNumber = generateSecretNumber();
    state.attempts = 0;
    state.history = [];
    state.isGameOver = false;
    
    // Сброс UI
    guessInput.value = '';
    guessInput.disabled = false;
    checkBtn.disabled = false;
    messageEl.textContent = '';
    messageEl.className = 'message';
    
    updateAttempts();
    renderHistory();
    
    // Фокус на поле ввода
    guessInput.focus();
    
}

// Запуск новой игры при загрузке страницы
window.addEventListener('DOMContentLoaded', startNewGame);

// Обработчик кнопки "Проверить"
checkBtn.addEventListener('click', handleCheck);

// Обработчик нажатия Enter в поле ввода
guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleCheck();
    }
});

// Обработчик кнопки "Новая игра"
newGameBtn.addEventListener('click', startNewGame);