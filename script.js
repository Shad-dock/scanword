// ================================================================
//  ДАННЫЕ СКАНВОРДА — ЗДЕСЬ ВСЯ ЛОГИКА СЛОВ И ПОДСКАЗОК
// ================================================================

// ВАЖНО: grid — это 10×10 сетка.
// Цифры означают номера слов, 0 — чёрная клетка.
// Каждое слово должно быть описано в words.h или words.v

const crosswordData = {
    grid: [
        [1, 2, 3, 0, 4, 5, 6, 0, 7, 8],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [10, 0, 11, 12, 0, 13, 0, 14, 15, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [16, 0, 17, 0, 18, 19, 0, 20, 0, 21],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [22, 0, 23, 0, 24, 0, 25, 26, 0, 27],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [28, 0, 29, 30, 0, 31, 32, 0, 33, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    words: {
        // Горизонтальные слова
        h: {
            1:  { row: 0, col: 0, length: 3, answer: 'КОТ' },
            2:  { row: 0, col: 1, length: 2, answer: 'ПЁС' },
            3:  { row: 0, col: 2, length: 1, answer: 'ЛЕВ' },
            4:  { row: 0, col: 4, length: 2, answer: 'СОВА' },
            5:  { row: 0, col: 5, length: 1, answer: 'РЫБА' },
            6:  { row: 0, col: 6, length: 2, answer: 'ВОЛК' },
            7:  { row: 0, col: 8, length: 2, answer: 'МИР' },
            8:  { row: 0, col: 9, length: 1, answer: 'ДОМ' },
            9:  { row: 1, col: 0, length: 1, answer: 'СЛОН' },
            10: { row: 2, col: 0, length: 2, answer: 'ТИГР' },
            11: { row: 2, col: 2, length: 2, answer: 'ЗАЯЦ' },
            12: { row: 2, col: 3, length: 1, answer: 'ЛИСА' },
            13: { row: 2, col: 5, length: 1, answer: 'МЕДВЕДЬ' },
            14: { row: 2, col: 7, length: 2, answer: 'ЕНОТ' },
            15: { row: 2, col: 8, length: 1, answer: 'БАРС' },
            16: { row: 4, col: 0, length: 1, answer: 'ВОРОН' },
            17: { row: 4, col: 2, length: 1, answer: 'СОРОКА' },
            18: { row: 4, col: 4, length: 2, answer: 'ГАЛКА' },
            19: { row: 4, col: 5, length: 2, answer: 'ЧАЙКА' },
            20: { row: 4, col: 7, length: 1, answer: 'СИНИЦА' },
            21: { row: 4, col: 9, length: 1, answer: 'ДЯТЕЛ' },
            22: { row: 6, col: 0, length: 1, answer: 'КОЗА' },
            23: { row: 6, col: 2, length: 1, answer: 'БАРАН' },
            24: { row: 6, col: 4, length: 2, answer: 'СВИНЬЯ' },
            25: { row: 6, col: 6, length: 2, answer: 'ЛОШАДЬ' },
            26: { row: 6, col: 7, length: 1, answer: 'КОРОВА' },
            27: { row: 6, col: 9, length: 1, answer: 'СОБАКА' },
            28: { row: 8, col: 0, length: 1, answer: 'МЫШЬ' },
            29: { row: 8, col: 2, length: 2, answer: 'КРЫСА' },
            30: { row: 8, col: 3, length: 1, answer: 'ХОМЯК' },
            31: { row: 8, col: 5, length: 2, answer: 'ЁЖ' },
            32: { row: 8, col: 6, length: 1, answer: 'БЕЛКА' },
            33: { row: 8, col: 8, length: 1, answer: 'ЛИС' }
        },
        // Вертикальные слова (добавляем, если есть)
        v: {
            // Пример: 1: { row: 0, col: 0, length: 3, answer: 'КОТ' },
        }
    },

    clues: {
        h: {
            1:  'Домашний любимец, ловит мышей',
            2:  'Верный друг человека',
            3:  'Царь зверей',
            4:  'Ночная птица, мудрая',
            5:  'Живёт в воде, чешуйчатая',
            6:  'Серый разбойник из леса',
            7:  'Слово, означающее согласие',
            8:  'Место, где живут люди',
            9:  'Огромное животное с хоботом',
            10: 'Полосатый хищник',
            11: 'Длинноухий прыгун',
            12: 'Рыжая обманщица',
            13: 'Косолапый из берлоги',
            14: 'Полоскун из леса',
            15: 'Снежный хищник',
            16: 'Чёрная птица',
            17: 'Белая птица-болтушка',
            18: 'Чёрная птица семейства врановых',
            19: 'Птица над морем',
            20: 'Маленькая синяя птичка',
            21: 'Стучит по дереву',
            22: 'Даёт молоко',
            23: 'Даёт шерсть',
            24: 'Даёт мясо и сало',
            25: 'Сильная и быстрая',
            26: 'Даёт молоко и мясо',
            27: 'Друг человека',
            28: 'Маленький серый зверёк',
            29: 'Серая, с длинным хвостом',
            30: 'Маленький домашний зверёк',
            31: 'Колючий лесной житель',
            32: 'Прыгает по деревьям',
            33: 'Хитрая, рыжая'
        },
        v: {}
    }
};

// ================================================================
//  ЛОГИКА
// ================================================================

const gridSize = 10;
const grid = crosswordData.grid;
const words = crosswordData.words;
const clues = crosswordData.clues;

const userAnswers = {};

const gridContainer = document.getElementById('crossword-grid');
const hCluesList = document.getElementById('horizontal-clues');
const vCluesList = document.getElementById('vertical-clues');
const messageDiv = document.getElementById('message');
const correctSpan = document.getElementById('correctCount');
const totalSpan = document.getElementById('totalCount');

let totalWordsCount = 0;
let correctWordsCount = 0;

// ================================================================
//  ФУНКЦИИ
// ================================================================

// Номер слова в клетке
function getCellNumber(row, col) {
    for (const [num, data] of Object.entries(words.h)) {
        if (data.row === row && data.col === col) return num;
    }
    for (const [num, data] of Object.entries(words.v)) {
        if (data.row === row && data.col === col) return num;
    }
    return null;
}

// Получить все буквы слова по его данным
function getWordLetters(wordData) {
    const letters = [];
    for (let i = 0; i < wordData.length; i++) {
        const r = wordData.row;
        const c = wordData.col + i;
        const key = `${r},${c}`;
        letters.push(userAnswers[key] || '');
    }
    return letters;
}

// Проверить одно слово
function checkWord(wordData, answer) {
    const letters = getWordLetters(wordData);
    const userWord = letters.join('');
    return userWord.toUpperCase() === answer.toUpperCase();
}

// Проверить все слова
function checkAll() {
    let correct = 0;
    let total = 0;

    // Горизонтальные
    for (const [num, data] of Object.entries(words.h)) {
        total++;
        const isCorrect = checkWord(data, data.answer);
        if (isCorrect) correct++;
        highlightWord(data, isCorrect);
    }

    // Вертикальные
    for (const [num, data] of Object.entries(words.v)) {
        total++;
        const isCorrect = checkWord(data, data.answer);
        if (isCorrect) correct++;
        highlightWord(data, isCorrect);
    }

    correctWordsCount = correct;
    totalWordsCount = total;
    updateScore();

    if (correct === total) {
        messageDiv.textContent = '🎉 Поздравляю! Ты разгадал ВСЁ! 🎉';
        messageDiv.style.color = '#8bff8b';
    } else {
        messageDiv.textContent = `✅ Правильно: ${correct} из ${total}. Продолжай! 💪`;
        messageDiv.style.color = '#b0b0ff';
    }
}

// Подсветка клеток слова
function highlightWord(wordData, isCorrect) {
    for (let i = 0; i < wordData.length; i++) {
        const r = wordData.row;
        const c = wordData.col + i;
        const cell = getCell(r, c);
        if (!cell) continue;
        cell.classList.remove('correct', 'incorrect');
        if (isCorrect) {
            cell.classList.add('correct');
        } else {
            const input = cell.querySelector('input');
            if (input && input.value.trim() !== '') {
                cell.classList.add('incorrect');
            }
        }
    }
}

// Получить клетку по координатам
function getCell(row, col) {
    const cells = gridContainer.querySelectorAll('.cell');
    for (const cell of cells) {
        if (parseInt(cell.dataset.row) === row && parseInt(cell.dataset.col) === col) {
            return cell;
        }
    }
    return null;
}

// Обновить счёт
function updateScore() {
    correctSpan.textContent = correctWordsCount;
    totalSpan.textContent = totalWordsCount;
}

// Очистить всё
function resetAll() {
    const inputs = gridContainer.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
        input.parentElement.classList.remove('correct', 'incorrect');
    });
    for (const key in userAnswers) {
        delete userAnswers[key];
    }
    correctWordsCount = 0;
    totalWordsCount = 0;
    updateScore();
    messageDiv.textContent = '🔄 Всё очищено! Начни заново.';
    messageDiv.style.color = '#b0b0ff';
    document.querySelectorAll('.clue-answer').forEach(el => el.classList.remove('show'));
}

// Подсказка: показать одну букву
function giveHint() {
    const inputs = gridContainer.querySelectorAll('input');
    const emptyInputs = [];
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            emptyInputs.push(input);
        }
    });

    if (emptyInputs.length === 0) {
        messageDiv.textContent = '💡 Все клетки заполнены! Проверь ответы.';
        return;
    }

    const randomInput = emptyInputs[Math.floor(Math.random() * emptyInputs.length)];
    const row = parseInt(randomInput.dataset.row);
    const col = parseInt(randomInput.dataset.col);

    // Найти слово, которому принадлежит клетка
    for (const [num, data] of Object.entries(words.h)) {
        if (data.row === row && data.col <= col && col < data.col + data.length) {
            const index = col - data.col;
            const letter = data.answer[index] || '';
            if (letter) {
                randomInput.value = letter;
                randomInput.parentElement.classList.add('hint');
                setTimeout(() => randomInput.parentElement.classList.remove('hint'), 1800);
                const key = `${row},${col}`;
                userAnswers[key] = letter;
                messageDiv.textContent = `💡 Подсказка: буква "${letter}" в клетке (${row+1}, ${col+1})`;
                return;
            }
        }
    }

    for (const [num, data] of Object.entries(words.v)) {
        if (data.col === col && data.row <= row && row < data.row + data.length) {
            const index = row - data.row;
            const letter = data.answer[index] || '';
            if (letter) {
                randomInput.value = letter;
                randomInput.parentElement.classList.add('hint');
                setTimeout(() => randomInput.parentElement.classList.remove('hint'), 1800);
                const key = `${row},${col}`;
                userAnswers[key] = letter;
                messageDiv.textContent = `💡 Подсказка: буква "${letter}" в клетке (${row+1}, ${col+1})`;
                return;
            }
        }
    }

    messageDiv.textContent = '😅 Не удалось найти подсказку для этой клетки';
}

// Переход к следующей клетке
function moveToNextCell(row, col) {
    const nextCol = col + 1;
    if (nextCol >= gridSize) return;
    const nextCell = getCell(row, nextCol);
    if (nextCell && !nextCell.classList.contains('black')) {
        const input = nextCell.querySelector('input');
        if (input) input.focus();
    }
}

// Рендер сетки
function renderGrid() {
    gridContainer.innerHTML = '';
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = r;
            cell.dataset.col = c;

            const value = grid[r][c];

            if (value === 0) {
                cell.classList.add('black');
            } else {
                const num = getCellNumber(r, c);
                if (num) {
                    const numSpan = document.createElement('span');
                    numSpan.className = 'number';
                    numSpan.textContent = num;
                    cell.appendChild(numSpan);
                }

                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.dataset.row = r;
                input.dataset.col = c;

                input.addEventListener('input', function () {
                    const val = this.value.toUpperCase();
                    this.value = val;
                    const key = `${r},${c}`;
                    userAnswers[key] = val;
                    this.parentElement.classList.remove('correct', 'incorrect');
                    messageDiv.textContent = '';
                });

                input.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        moveToNextCell(r, c);
                    }
                    if (e.key === 'Backspace' && this.value === '') {
                        const prevCol = c - 1;
                        if (prevCol >= 0) {
                            const prevCell = getCell(r, prevCol);
                            if (prevCell && !prevCell.classList.contains('black')) {
                                const prevInput = prevCell.querySelector('input');
                                if (prevInput) prevInput.focus();
                            }
                        }
                    }
                });

                cell.appendChild(input);
            }
            gridContainer.appendChild(cell);
        }
    }
}

// Рендер подсказок
function renderClues() {
    hCluesList.innerHTML = '';
    for (const [num, data] of Object.entries(words.h)) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="clue-number">${num}.</span>
            <span class="clue-text">${clues.h[num] || 'Нет подсказки'}</span>
            <span class="clue-answer">${data.answer}</span>
        `;
        hCluesList.appendChild(li);
    }

    vCluesList.innerHTML = '';
    for (const [num, data] of Object.entries(words.v)) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="clue-number">${num}.</span>
            <span class="clue-text">${clues.v[num] || 'Нет подсказки'}</span>
            <span class="clue-answer">${data.answer}</span>
        `;
        vCluesList.appendChild(li);
    }
}

// Показать все ответы (по клику на подсказку)
function toggleAnswers() {
    document.querySelectorAll('.clue-answer').forEach(el => {
        el.classList.toggle('show');
    });
}

// ================================================================
//  ИНИЦИАЛИЗАЦИЯ
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    renderClues();

    // Кнопки
    document.getElementById('checkBtn').addEventListener('click', checkAll);
    document.getElementById('resetBtn').addEventListener('click', resetAll);
    document.getElementById('hintBtn').addEventListener('click', giveHint);

    // Клик по подсказке показывает ответ
    document.querySelectorAll('.clue-section li').forEach((li, index) => {
        li.style.cursor = 'pointer';
        li.addEventListener('click', function () {
            const answerSpan = this.querySelector('.clue-answer');
            if (answerSpan) {
                answerSpan.classList.toggle('show');
            }
        });
    });

    // Первоначальный счёт
    totalWordsCount = Object.keys(words.h).length + Object.keys(words.v).length;
    totalSpan.textContent = totalWordsCount;
    correctSpan.textContent = 0;

    messageDiv.textContent = '🧩 Вписывай буквы и нажимай "Проверить всё"';
});