// ================================================================
//  ДАННЫЕ СКАНВОРДА
// ================================================================

// Сетка: буквы, 0 = чёрная клетка
const gridData = [
    ['К', 'О', 'Т', 0, 'С', 'О', 'В', 0, 'М', 'И'],
    ['С', 0, 0, 0, 0, 0, 0, 0, 0, 'Р'],
    ['Т', 0, 'З', 'А', 0, 'М', 0, 'Е', 'Н', 0],
    [0, 0, 'Я', 'Ц', 0, 'Е', 0, 'О', 'Т', 0],
    ['В', 0, 'С', 0, 'Г', 'А', 0, 'С', 0, 'Д'],
    [0, 0, 'О', 0, 'Л', 'Й', 0, 'И', 0, 'Я'],
    ['К', 0, 'Б', 0, 'С', 'В', 0, 'К', 0, 'С'],
    [0, 0, 'А', 0, 'В', 'И', 0, 'О', 0, 'О'],
    ['М', 0, 'К', 'Р', 0, 'Ё', 'Ж', 0, 'Л', 0],
    [0, 0, 'Р', 'Ы', 0, 'Ж', 'Ж', 0, 'И', 0]
];

// Вопросы: "row,col" → текст вопроса
// Важно: вопрос должен быть у первой буквы слова
const questions = {
    "0,0": 'Домашний любимец',
    "0,4": 'Ночная птица',
    "0,8": 'Согласие',
    "1,0": 'Огромный с хоботом',
    "2,0": 'Полосатый хищник',
    "2,2": 'Длинноухий',
    "2,5": 'Косолапый',
    "2,7": 'Полоскун',
    "4,0": 'Чёрная птица',
    "4,2": 'Белая болтушка',
    "4,4": 'Врановые',
    "4,7": 'Синяя птичка',
    "4,9": 'Стучит по дереву',
    "6,0": 'Даёт молоко',
    "6,2": 'Даёт шерсть',
    "6,4": 'Даёт сало',
    "6,7": 'Даёт мясо',
    "6,9": 'Друг человека',
    "8,0": 'Маленький серый',
    "8,2": 'С длинным хвостом',
    "8,5": 'Колючий',
    "8,8": 'Хитрая',
};

// ================================================================
//  АВТОМАТИЧЕСКИЙ СБОР СЛОВ С УКАЗАНИЕМ НАПРАВЛЕНИЯ
// ================================================================

function buildWordsFromGrid(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const words = { h: {}, v: {} };
    let wordId = 1;

    // Горизонтальные (→)
    for (let r = 0; r < rows; r++) {
        let c = 0;
        while (c < cols) {
            if (grid[r][c] !== 0) {
                let start = c;
                let word = '';
                while (c < cols && grid[r][c] !== 0) {
                    word += grid[r][c];
                    c++;
                }
                if (word.length >= 2) {
                    words.h[wordId] = {
                        row: r,
                        col: start,
                        length: word.length,
                        answer: word,
                        dir: '→',
                    };
                    wordId++;
                }
            } else {
                c++;
            }
        }
    }

    // Вертикальные (↓)
    for (let c = 0; c < cols; c++) {
        let r = 0;
        while (r < rows) {
            if (grid[r][c] !== 0) {
                let start = r;
                let word = '';
                while (r < rows && grid[r][c] !== 0) {
                    word += grid[r][c];
                    r++;
                }
                if (word.length >= 2) {
                    words.v[wordId] = {
                        row: start,
                        col: c,
                        length: word.length,
                        answer: word,
                        dir: '↓',
                    };
                    wordId++;
                }
            } else {
                r++;
            }
        }
    }

    return words;
}

// ================================================================
//  ИНИЦИАЛИЗАЦИЯ
// ================================================================

const words = buildWordsFromGrid(gridData);
const rows = gridData.length;
const cols = gridData[0].length;

const userAnswers = {};
const solvedWords = new Set();

const gridContainer = document.getElementById('crossword-grid');
const messageDiv = document.getElementById('message');
const correctSpan = document.getElementById('correctCount');
const totalSpan = document.getElementById('totalCount');

let totalWordsCount = Object.keys(words.h).length + Object.keys(words.v).length;
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
        if (data.row === row && data.col <= col && col < data.col + data.length) {
            return { id: parseInt(id), data, dir: 'h' };
        }
    }
    for (const [id, data] of Object.entries(words.v)) {
        if (data.col === col && data.row <= row && row < data.row + data.length) {
            return { id: parseInt(id), data, dir: 'v' };
        }
    }
    return null;
}

function isWordFullyEntered(id, data) {
    for (let i = 0; i < data.length; i++) {
        const r = data.row;
        const c = data.col + i;
        const key = `${r},${c}`;
        if (!userAnswers[key] || userAnswers[key].trim() === '') {
            return false;
        }
    }
    return true;
}

function checkWordCorrect(id, data) {
    let word = '';
    for (let i = 0; i < data.length; i++) {
        const r = data.row;
        const c = data.col + i;
        const key = `${r},${c}`;
        word += (userAnswers[key] || '').toUpperCase();
    }
    return word === data.answer;
}

function lockWord(id, data) {
    solvedWords.add(id);
    for (let i = 0; i < data.length; i++) {
        const r = data.row;
        const c = data.col + i;
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
    for (let i = 0; i < data.length; i++) {
        const r = data.row;
        const c = data.col + i;
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
    const nextCol = col + 1;
    if (nextCol >= cols) return;
    const nextCell = getCell(row, nextCol);
    if (nextCell && !nextCell.classList.contains('black')) {
        const input = nextCell.querySelector('input');
        if (input && !input.disabled) {
            input.focus();
            input.select();
        } else if (input && input.disabled) {
            moveToNextCell(row, nextCol);
        }
    } else {
        moveToNextCell(row, nextCol);
    }
}

function moveToPrevCell(row, col) {
    const prevCol = col - 1;
    if (prevCol < 0) return;
    const prevCell = getCell(row, prevCol);
    if (prevCell && !prevCell.classList.contains('black')) {
        const input = prevCell.querySelector('input');
        if (input && !input.disabled) {
            input.focus();
            input.select();
        } else if (input && input.disabled) {
            moveToPrevCell(row, prevCol);
        }
    } else {
        moveToPrevCell(row, prevCol);
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
            const isCorrect = checkWordCorrect(numId, data);
            if (isCorrect) {
                lockWord(numId, data);
            } else {
                for (let i = 0; i < data.length; i++) {
                    const r = data.row;
                    const c = data.col + i;
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
            const isCorrect = checkWordCorrect(numId, data);
            if (isCorrect) {
                lockWord(numId, data);
            } else {
                for (let i = 0; i < data.length; i++) {
                    const r = data.row + i;
                    const c = data.col;
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
    const index = col - data.col;
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
//  РЕНДЕР СЕТКИ
// ================================================================

function renderGrid() {
    gridContainer.innerHTML = '';
    const size = getCellSize();
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${size}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, ${size}px)`;

    // Собираем информацию о направлениях для каждой клетки
    const directions = {};
    const wordIds = {};

    for (const [id, data] of Object.entries(words.h)) {
        const key = `${data.row},${data.col}`;
        wordIds[key] = id;
        directions[key] = '→';
    }
    for (const [id, data] of Object.entries(words.v)) {
        const key = `${data.row},${data.col}`;
        if (!wordIds[key]) {
            wordIds[key] = id;
            directions[key] = '↓';
        }
        // Если есть и горизонтальное, и вертикальное — показываем оба
        if (wordIds[key]) {
            // Уже есть горизонтальное — добавляем вертикальное как дополнительное
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = r;
            cell.dataset.col = c;

            const letter = gridData[r][c];

            if (letter === 0) {
                cell.classList.add('black');
            } else {
                const key = `${r},${c}`;
                const wordId = wordIds[key];
                const dir = directions[key] || '';

                if (wordId) {
                    // Номер + стрелка
                    const numSpan = document.createElement('span');
                    numSpan.className = 'number';
                    const arrowSpan = document.createElement('span');
                    arrowSpan.className = 'arrow';
                    arrowSpan.textContent = dir;
                    numSpan.appendChild(arrowSpan);
                    numSpan.insertAdjacentText('beforeend', wordId);
                    cell.appendChild(numSpan);

                    // Вопрос
                    const questionText = questions[key] || '';
                    if (questionText) {
                        const qSpan = document.createElement('span');
                        qSpan.className = 'question';
                        qSpan.textContent = questionText;
                        cell.appendChild(qSpan);
                    }
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
                                for (let i = 0; i < data.length; i++) {
                                    const rr = data.row;
                                    const cc = data.col + i;
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

function getCellSize() {
    const width = window.innerWidth;
    if (width < 450) return 34;
    if (width < 700) return 44;
    return 56;
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

    totalSpan.textContent = totalWordsCount;
    correctSpan.textContent = 0;

    document.getElementById('checkBtn').addEventListener('click', checkAll);
    document.getElementById('resetBtn').addEventListener('click', resetAll);
    document.getElementById('hintBtn').addEventListener('click', giveHint);

    window.addEventListener('resize', updateSizes);

    messageDiv.textContent = '🧩 Вписывай буквы — слова проверяются автоматически!';
});
