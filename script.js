// ================================================================
//  ДАННЫЕ СКАНВОРДА
// ================================================================

// Сетка: 1 = белая клетка, 0 = чёрная
const gridData = [
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
    [0, 0, 1, 1, 0, 1, 0, 1, 1, 0],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
    [0, 0, 1, 1, 0, 1, 1, 0, 1, 0]
];

// Список слов
// id — номер слова
// row, col — координаты первой буквы
// direction: 'h' = горизонтально, 'v' = вертикально
// answer — правильный ответ (заглавными буквами)
// question — текст вопроса
const wordsData = [
    // Горизонтальные
    { id: 1, row: 0, col: 0, direction: 'h', answer: 'КОТ', question: 'Домашний любимец' },
    { id: 2, row: 0, col: 4, direction: 'h', answer: 'СОВА', question: 'Ночная птица' },
    { id: 3, row: 0, col: 8, direction: 'h', answer: 'МИР', question: 'Согласие' },
    { id: 4, row: 2, col: 0, direction: 'h', answer: 'ТИГР', question: 'Полосатый хищник' },
    { id: 5, row: 2, col: 2, direction: 'h', answer: 'ЗАЯЦ', question: 'Длинноухий' },
    { id: 6, row: 2, col: 5, direction: 'h', answer: 'МЕДВЕДЬ', question: 'Косолапый' },
    { id: 7, row: 2, col: 7, direction: 'h', answer: 'ЕНОТ', question: 'Полоскун' },
    { id: 8, row: 4, col: 0, direction: 'h', answer: 'ВОРОН', question: 'Чёрная птица' },
    { id: 9, row: 4, col: 2, direction: 'h', answer: 'СОРОКА', question: 'Белая болтушка' },
    { id: 10, row: 4, col: 4, direction: 'h', answer: 'ГАЛКА', question: 'Врановые' },
    { id: 11, row: 4, col: 7, direction: 'h', answer: 'СИНИЦА', question: 'Синяя птичка' },
    { id: 12, row: 4, col: 9, direction: 'h', answer: 'ДЯТЕЛ', question: 'Стучит по дереву' },
    { id: 13, row: 6, col: 0, direction: 'h', answer: 'КОЗА', question: 'Даёт молоко' },
    { id: 14, row: 6, col: 2, direction: 'h', answer: 'БАРАН', question: 'Даёт шерсть' },
    { id: 15, row: 6, col: 4, direction: 'h', answer: 'СВИНЬЯ', question: 'Даёт сало' },
    { id: 16, row: 6, col: 7, direction: 'h', answer: 'КОРОВА', question: 'Даёт мясо' },
    { id: 17, row: 6, col: 9, direction: 'h', answer: 'СОБАКА', question: 'Друг человека' },
    { id: 18, row: 8, col: 0, direction: 'h', answer: 'МЫШЬ', question: 'Маленький серый' },
    { id: 19, row: 8, col: 2, direction: 'h', answer: 'КРЫСА', question: 'С длинным хвостом' },
    { id: 20, row: 8, col: 5, direction: 'h', answer: 'ЁЖ', question: 'Колючий' },
    { id: 21, row: 8, col: 8, direction: 'h', answer: 'ЛИС', question: 'Хитрая' },

    // Вертикальные
    { id: 22, row: 0, col: 0, direction: 'v', answer: 'СЛОН', question: 'Огромный с хоботом' },
    { id: 23, row: 0, col: 4, direction: 'v', answer: 'РЫБА', question: 'Живёт в воде' },
    { id: 24, row: 0, col: 8, direction: 'v', answer: 'ДОМ', question: 'Место для жизни' },
    { id: 25, row: 1, col: 9, direction: 'v', answer: 'РЫСЬ', question: 'Дикая кошка' },
    // ... можно добавить ещё
];

// ================================================================
//  ИНИЦИАЛИЗАЦИЯ
// ================================================================

const rows = gridData.length;
const cols = gridData[0].length;

const userAnswers = {};
const solvedWords = new Set();

const gridContainer = document.getElementById('crossword-grid');
const hCluesList = document.getElementById('horizontal-clues');
const vCluesList = document.getElementById('vertical-clues');
const messageDiv = document.getElementById('message');
const correctSpan = document.getElementById('correctCount');
const totalSpan = document.getElementById('totalCount');

// Собираем слова по направлениям
const words = { h: {}, v: {} };
wordsData.forEach(w => {
    if (w.direction === 'h') words.h[w.id] = w;
    else words.v[w.id] = w;
});

const totalWordsCount = wordsData.length;
let correctWordsCount = 0;

// ================================================================
//  ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ================================================================

function getCell(row, col) {
    const cells = gridContainer.querySelectorAll('.cell');
    for (const cell of cells) {
        if (parseInt(cell.dataset.row) === row && parseInt(cell.dataset.col) === col) {
            return cell;
        }
    }
    return null;
}

function getWordForCell(row, col) {
    for (const [id, data] of Object.entries(words.h)) {
        if (data.row === row && data.col <= col && col < data.col + data.answer.length) {
            return { id: parseInt(id), data };
        }
    }
    for (const [id, data] of Object.entries(words.v)) {
        if (data.col === col && data.row <= row && row < data.row + data.answer.length) {
            return { id: parseInt(id), data };
        }
    }
    return null;
}

function isWordFullyEntered(id, data) {
    const word = data.answer;
    for (let i = 0; i < word.length; i++) {
        const r = data.direction === 'h' ? data.row : data.row + i;
        const c = data.direction === 'h' ? data.col + i : data.col;
        const key = `${r},${c}`;
        if (!userAnswers[key] || userAnswers[key].trim() === '') {
            return false;
        }
    }
    return true;
}

function checkWordCorrect(id, data) {
    let word = '';
    const answer = data.answer;
    for (let i = 0; i < answer.length; i++) {
        const r = data.direction === 'h' ? data.row : data.row + i;
        const c = data.direction === 'h' ? data.col + i : data.col;
        const key = `${r},${c}`;
        word += (userAnswers[key] || '').toUpperCase();
    }
    return word === answer;
}

function lockWord(id, data) {
    solvedWords.add(id);
    const word = data.answer;
    for (let i = 0; i < word.length; i++) {
        const r = data.direction === 'h' ? data.row : data.row + i;
        const c = data.direction === 'h' ? data.col + i : data.col;
        const cell = getCell(r, c);
        if (cell) {
            const input = cell.querySelector('input');
            if (input) {
                input.disabled = true;
                cell.classList.add('correct');
            }
        }
    }
    correctWordsCount++;
    updateScore();
}

function unlockWord(id, data) {
    solvedWords.delete(id);
    const word = data.answer;
    for (let i = 0; i < word.length; i++) {
        const r = data.direction === 'h' ? data.row : data.row + i;
        const c = data.direction === 'h' ? data.col + i : data.col;
        const cell = getCell(r, c);
        if (cell) {
            const input = cell.querySelector('input');
            if (input) {
                input.disabled = false;
                cell.classList.remove('correct', 'incorrect');
            }
        }
    }
    correctWordsCount--;
    updateScore();
}

function moveToNextCell(row, col) {
    // Ищем следующую белую клетку в строке
    let nextCol = col + 1;
    while (nextCol < cols) {
        if (gridData[row][nextCol] === 1) {
            const cell = getCell(row, nextCol);
            if (cell) {
                const input = cell.querySelector('input');
                if (input && !input.disabled) {
                    input.focus();
                    input.select();
                    return;
                }
            }
        }
        nextCol++;
    }
    // Если дошли до конца строки — переходим на следующую
    for (let r = row + 1; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (gridData[r][c] === 1) {
                const cell = getCell(r, c);
                if (cell) {
                    const input = cell.querySelector('input');
                    if (input && !input.disabled) {
                        input.focus();
                        input.select();
                        return;
                    }
                }
            }
        }
    }
}

function moveToPrevCell(row, col) {
    let prevCol = col - 1;
    while (prevCol >= 0) {
        if (gridData[row][prevCol] === 1) {
            const cell = getCell(row, prevCol);
            if (cell) {
                const input = cell.querySelector('input');
                if (input && !input.disabled) {
                    input.focus();
                    input.select();
                    return;
                }
            }
        }
        prevCol--;
    }
    for (let r = row - 1; r >= 0; r--) {
        for (let c = cols - 1; c >= 0; c--) {
            if (gridData[r][c] === 1) {
                const cell = getCell(r, c);
                if (cell) {
                    const input = cell.querySelector('input');
                    if (input && !input.disabled) {
                        input.focus();
                        input.select();
                        return;
                    }
                }
            }
        }
    }
}

function updateScore() {
    correctSpan.textContent = correctWordsCount;
    totalSpan.textContent = totalWordsCount;
}

// ================================================================
//  ОСНОВНЫЕ ФУНКЦИИ
// ================================================================

function checkAll() {
    for (const [id, data] of Object.entries(words.h)) {
        const numId = parseInt(id);
        if (solvedWords.has(numId)) continue;
        if (isWordFullyEntered(numId, data)) {
            if (checkWordCorrect(numId, data)) {
                lockWord(numId, data);
            } else {
                const word = data.answer;
                for (let i = 0; i < word.length; i++) {
                    const r = data.direction === 'h' ? data.row : data.row + i;
                    const c = data.direction === 'h' ? data.col + i : data.col;
                    const cell = getCell(r, c);
                    if (cell) {
                        const input = cell.querySelector('input');
                        if (input && !input.disabled && input.value.trim() !== '') {
                            cell.classList.add('incorrect');
                        }
                    }
                }
            }
        }
    }

    for (const [id, data] of Object.entries(words.v)) {
        const numId = parseInt(id);
        if (solvedWords.has(numId)) continue;
        if (isWordFullyEntered(numId, data)) {
            if (checkWordCorrect(numId, data)) {
                lockWord(numId, data);
            } else {
                const word = data.answer;
                for (let i = 0; i < word.length; i++) {
                    const r = data.direction === 'h' ? data.row : data.row + i;
                    const c = data.direction === 'h' ? data.col + i : data.col;
                    const cell = getCell(r, c);
                    if (cell) {
                        const input = cell.querySelector('input');
                        if (input && !input.disabled && input.value.trim() !== '') {
                            cell.classList.add('incorrect');
                        }
                    }
                }
            }
        }
    }

    if (correctWordsCount === totalWordsCount) {
        messageDiv.textContent = '🎉 ПОЗДРАВЛЯЮ! Ты разгадал ВСЁ! 🎉';
        messageDiv.style.color = '#8bff8b';
    } else {
        messageDiv.textContent = `✅ Проверка завершена. Отгадано: ${correctWordsCount} из ${totalWordsCount}`;
        messageDiv.style.color = '#b0b0ff';
    }
}

function resetAll() {
    for (const [id, data] of Object.entries(words.h)) {
        const numId = parseInt(id);
        if (solvedWords.has(numId)) {
            unlockWord(numId, data);
        }
    }
    for (const [id, data] of Object.entries(words.v)) {
        const numId = parseInt(id);
        if (solvedWords.has(numId)) {
            unlockWord(numId, data);
        }
    }

    const inputs = gridContainer.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
        input.disabled = false;
        input.parentElement.classList.remove('correct', 'incorrect');
    });

    for (const key in userAnswers) {
        delete userAnswers[key];
    }

    correctWordsCount = 0;
    updateScore();
    messageDiv.textContent = '🔄 Всё очищено! Начни заново.';
    messageDiv.style.color = '#b0b0ff';
}

function giveHint() {
    const inputs = gridContainer.querySelectorAll('input:not(:disabled)');
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

    const wordInfo = getWordForCell(row, col);
    if (!wordInfo) {
        messageDiv.textContent = '😅 Не удалось найти слово';
        return;
    }

    const { id, data } = wordInfo;
    const index = data.direction === 'h' ? col - data.col : row - data.row;
    const letter = data.answer[index] || '';

    if (letter) {
        randomInput.value = letter;
        const key = `${row},${col}`;
        userAnswers[key] = letter;
        randomInput.parentElement.classList.add('hint');
        setTimeout(() => randomInput.parentElement.classList.remove('hint'), 1800);

        if (isWordFullyEntered(id, data) && checkWordCorrect(id, data)) {
            lockWord(id, data);
            messageDiv.textContent = `💡 Подсказка: буква "${letter}". Слово угадано! 🎉`;
            messageDiv.style.color = '#8bff8b';
        } else {
            messageDiv.textContent = `💡 Подсказка: буква "${letter}"`;
            messageDiv.style.color = '#b0b0ff';
        }
    }
}

// ================================================================
//  РЕНДЕР СЕТКИ И ВОПРОСОВ
// ================================================================

function renderGrid() {
    gridContainer.innerHTML = '';
    const size = getCellSize();
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${size}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, ${size}px)`;

    // Собираем стартовые позиции для номеров
    const startPositions = {};
    wordsData.forEach(w => {
        const key = `${w.row},${w.col}`;
        if (!startPositions[key]) {
            startPositions[key] = [];
        }
        startPositions[key].push(w.id);
    });

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = r;
            cell.dataset.col = c;

            if (gridData[r][c] === 0) {
                cell.classList.add('black');
            } else {
                // Номер слова
                const key = `${r},${c}`;
                if (startPositions[key]) {
                    const numSpan = document.createElement('span');
                    numSpan.className = 'number';
                    numSpan.textContent = startPositions[key].join(',');
                    cell.appendChild(numSpan);
                }

                // Поле ввода
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.dataset.row = r;
                input.dataset.col = c;

                input.addEventListener('input', function() {
                    const val = this.value.toUpperCase();
                    this.value = val;
                    const key = `${r},${c}`;
                    userAnswers[key] = val;
                    this.parentElement.classList.remove('incorrect');

                    const wordInfo = getWordForCell(r, c);
                    if (wordInfo) {
                        const { id, data } = wordInfo;
                        if (!solvedWords.has(id) && isWordFullyEntered(id, data)) {
                            if (checkWordCorrect(id, data)) {
                                lockWord(id, data);
                                messageDiv.textContent = '🎉 Слово угадано!';
                                messageDiv.style.color = '#8bff8b';
                            } else {
                                const word = data.answer;
                                for (let i = 0; i < word.length; i++) {
                                    const rr = data.direction === 'h' ? data.row : data.row + i;
                                    const cc = data.direction === 'h' ? data.col + i : data.col;
                                    const cellEl = getCell(rr, cc);
                                    if (cellEl) {
                                        const inp = cellEl.querySelector('input');
                                        if (inp && !inp.disabled && inp.value.trim() !== '') {
                                            cellEl.classList.add('incorrect');
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (val.trim() !== '') {
                        moveToNextCell(r, c);
                    }
                });

                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Backspace' && this.value === '') {
                        e.preventDefault();
                        moveToPrevCell(r, c);
                    }
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        moveToNextCell(r, c);
                    }
                });

                cell.appendChild(input);
            }

            gridContainer.appendChild(cell);
        }
    }
}

function renderClues() {
    hCluesList.innerHTML = '';
    vCluesList.innerHTML = '';

    // Горизонтальные
    for (const [id, data] of Object.entries(words.h)) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="clue-number">${id}.</span>
            <span class="clue-text">${data.question}</span>
            <span class="clue-answer">${data.answer}</span>
        `;
        li.addEventListener('click', function() {
            const answerSpan = this.querySelector('.clue-answer');
            if (answerSpan) answerSpan.classList.toggle('show');
        });
        hCluesList.appendChild(li);
    }

    // Вертикальные
    for (const [id, data] of Object.entries(words.v)) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="clue-number">${id}.</span>
            <span class="clue-text">${data.question}</span>
            <span class="clue-answer">${data.answer}</span>
        `;
        li.addEventListener('click', function() {
            const answerSpan = this.querySelector('.clue-answer');
            if (answerSpan) answerSpan.classList.toggle('show');
        });
        vCluesList.appendChild(li);
    }
}

function getCellSize() {
    const width = window.innerWidth;
    if (width < 450) return 32;
    if (width < 700) return 40;
    return 50;
}

function updateSizes() {
    const size = getCellSize();
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${size}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, ${size}px)`;

    const cells = gridContainer.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.width = size + 'px';
        cell.style.height = size + 'px';
    });
}

// ================================================================
//  ЗАПУСК
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    renderClues();

    totalSpan.textContent = totalWordsCount;
    correctSpan.textContent = 0;

    document.getElementById('checkBtn').addEventListener('click', checkAll);
    document.getElementById('resetBtn').addEventListener('click', resetAll);
    document.getElementById('hintBtn').addEventListener('click', giveHint);

    window.addEventListener('resize', updateSizes);

    messageDiv.textContent = '🧩 Вписывай буквы — слова проверяются автоматически!';
});
