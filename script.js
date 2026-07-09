// ================================================================
//  ДАННЫЕ СКАНВОРДА "ЖИВОТНЫЕ"
// ================================================================

// Сетка: 1 = белая клетка, 0 = чёрная
const gridData = [
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Слова: id, координаты, направление, ответ, вопрос
const wordsData = [
    // ===== ГОРИЗОНТАЛЬНЫЕ =====
    { id: 1,  row: 0, col: 0, direction: 'h', answer: 'КОТ',   question: 'Домашний любимец, ловит мышей' },
    { id: 2,  row: 0, col: 4, direction: 'h', answer: 'СОВА',  question: 'Ночная птица, мудрая' },
    { id: 3,  row: 0, col: 8, direction: 'h', answer: 'РЫБА',  question: 'Живёт в воде, чешуйчатая' },
    { id: 4,  row: 2, col: 0, direction: 'h', answer: 'ТИГР',  question: 'Полосатый хищник' },
    { id: 5,  row: 2, col: 2, direction: 'h', answer: 'ЗАЯЦ',  question: 'Длинноухий прыгун' },
    { id: 6,  row: 2, col: 5, direction: 'h', answer: 'ЛЕВ',   question: 'Царь зверей' },
    { id: 7,  row: 2, col: 8, direction: 'h', answer: 'СЛОН',  question: 'Огромный с хоботом' },
    { id: 8,  row: 4, col: 0, direction: 'h', answer: 'ВОЛК',  question: 'Серый разбойник из леса' },
    { id: 9,  row: 4, col: 2, direction: 'h', answer: 'ЛИСА',  question: 'Рыжая обманщица' },
    { id: 10, row: 4, col: 4, direction: 'h', answer: 'ЕНОТ',  question: 'Полоскун из леса' },
    { id: 11, row: 4, col: 6, direction: 'h', answer: 'ВОРОН', question: 'Чёрная птица' },
    { id: 12, row: 4, col: 8, direction: 'h', answer: 'СОРОКА', question: 'Белая птица-болтушка' },
    { id: 13, row: 6, col: 0, direction: 'h', answer: 'КОЗА',  question: 'Даёт молоко' },
    { id: 14, row: 6, col: 2, direction: 'h', answer: 'БАРАН', question: 'Даёт шерсть' },
    { id: 15, row: 6, col: 8, direction: 'h', answer: 'КОРОВА', question: 'Даёт молоко и мясо' },
    { id: 16, row: 8, col: 0, direction: 'h', answer: 'МЫШЬ',  question: 'Маленький серый зверёк' },
    { id: 17, row: 8, col: 2, direction: 'h', answer: 'КРЫСА', question: 'Серая, с длинным хвостом' },
    { id: 18, row: 8, col: 4, direction: 'h', answer: 'ХОМЯК', question: 'Маленький домашний зверёк' },
    { id: 19, row: 8, col: 7, direction: 'h', answer: 'ЁЖ',    question: 'Колючий лесной житель' },
    { id: 20, row: 8, col: 9, direction: 'h', answer: 'БЕЛКА', question: 'Прыгает по деревьям' },
    { id: 21, row: 10, col: 0, direction: 'h', answer: 'ПЁС',  question: 'Верный друг человека' },
    { id: 22, row: 10, col: 3, direction: 'h', answer: 'МЕДВЕДЬ', question: 'Косолапый из берлоги' },
    { id: 23, row: 10, col: 7, direction: 'h', answer: 'ЧАЙКА', question: 'Птица над морем' },

    // ===== ВЕРТИКАЛЬНЫЕ =====
    { id: 24, row: 0, col: 0, direction: 'v', answer: 'ЛЕВ',   question: 'Животное с гривой' },
    { id: 25, row: 0, col: 4, direction: 'v', answer: 'СОВА',  question: 'Птица-символ мудрости' },
    { id: 26, row: 0, col: 8, direction: 'v', answer: 'ЗЕБРА', question: 'Полосатая лошадка' },
    { id: 27, row: 2, col: 0, direction: 'v', answer: 'ТИГР',  question: 'Хищник с полосками' },
    { id: 28, row: 0, col: 2, direction: 'v', answer: 'ЛИС',   question: 'Хитрая, рыжая' },
    { id: 29, row: 0, col: 6, direction: 'v', answer: 'ГЕПАРД', question: 'Самое быстрое животное' },
    { id: 30, row: 2, col: 5, direction: 'v', answer: 'ЛОСЬ',  question: 'Лесной великан' },
    { id: 31, row: 4, col: 4, direction: 'v', answer: 'КУРИЦА', question: 'Домашняя птица' },
    { id: 32, row: 6, col: 8, direction: 'v', answer: 'БОБР',  question: 'Животное-строитель' },
];

// ================================================================
//  ИНИЦИАЛИЗАЦИЯ
// ================================================================

const rows = gridData.length;
const cols = gridData[0].length;

const userAnswers = {};
const solvedWords = new Set();
let activeWordId = null;

const gridContainer = document.getElementById('crossword-grid');
const hCluesList = document.getElementById('horizontal-clues');
const vCluesList = document.getElementById('vertical-clues');
const messageDiv = document.getElementById('message');
const correctSpan = document.getElementById('correctCount');
const totalSpan = document.getElementById('totalCount');

const words = { h: {}, v: {} };
wordsData.forEach(w => {
    if (w.direction === 'h') words.h[w.id] = w;
    else words.v[w.id] = w;
});

const totalWordsCount = wordsData.length;
let correctWordsCount = 0;

// ================================================================
//  ОСНОВНЫЕ ФУНКЦИИ
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

function getWordById(id) {
    return words.h[id] || words.v[id];
}

function getWordCells(id, data) {
    const cells = [];
    const word = data.answer;
    for (let i = 0; i < word.length; i++) {
        const r = data.direction === 'h' ? data.row : data.row + i;
        const c = data.direction === 'h' ? data.col + i : data.col;
        cells.push({ row: r, col: c });
    }
    return cells;
}

function isWordFullyEntered(id, data) {
    const cells = getWordCells(id, data);
    for (const { row, col } of cells) {
        const key = `${row},${col}`;
        if (!userAnswers[key] || userAnswers[key].trim() === '') {
            return false;
        }
    }
    return true;
}

function checkWordCorrect(id, data) {
    let word = '';
    const cells = getWordCells(id, data);
    for (const { row, col } of cells) {
        const key = `${row},${col}`;
        word += (userAnswers[key] || '').toUpperCase();
    }
    return word === data.answer;
}

function lockWord(id, data) {
    solvedWords.add(id);
    const cells = getWordCells(id, data);
    for (const { row, col } of cells) {
        const cell = getCell(row, col);
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
    updateClueStatus(id);
}

function unlockWord(id, data) {
    solvedWords.delete(id);
    const cells = getWordCells(id, data);
    for (const { row, col } of cells) {
        const cell = getCell(row, col);
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
    updateClueStatus(id);
}

function updateClueStatus(id) {
    const allClues = document.querySelectorAll('.clue-section li');
    allClues.forEach(li => {
        const clueId = parseInt(li.dataset.id);
        if (clueId === id) {
            if (solvedWords.has(id)) {
                li.classList.add('solved-clue');
            } else {
                li.classList.remove('solved-clue');
            }
        }
    });
}

function highlightWord(id) {
    document.querySelectorAll('.cell.active-word').forEach(el => {
        el.classList.remove('active-word');
    });
    document.querySelectorAll('.clue-section li').forEach(el => {
        el.classList.remove('active-clue');
    });

    if (id === null) {
        activeWordId = null;
        return;
    }

    const data = getWordById(id);
    if (!data || solvedWords.has(id)) return;

    activeWordId = id;

    const cells = getWordCells(id, data);
    for (const { row, col } of cells) {
        const cell = getCell(row, col);
        if (cell) {
            cell.classList.add('active-word');
        }
    }

    const allClues = document.querySelectorAll('.clue-section li');
    allClues.forEach(li => {
        const clueId = parseInt(li.dataset.id);
        if (clueId === id) {
            li.classList.add('active-clue');
        }
    });

    for (const { row, col } of cells) {
        const cell = getCell(row, col);
        if (cell) {
            const input = cell.querySelector('input');
            if (input && !input.disabled && input.value.trim() === '') {
                input.focus();
                break;
            }
        }
    }
}

function moveToNextCellInWord(id, currentRow, currentCol) {
    const data = getWordById(id);
    if (!data) return;

    const cells = getWordCells(id, data);
    let found = false;
    for (const { row, col } of cells) {
        if (found) {
            const cell = getCell(row, col);
            if (cell) {
                const input = cell.querySelector('input');
                if (input && !input.disabled) {
                    input.focus();
                    input.select();
                    return;
                }
            }
        }
        if (row === currentRow && col === currentCol) {
            found = true;
        }
    }
}

function updateScore() {
    correctSpan.textContent = correctWordsCount;
    totalSpan.textContent = totalWordsCount;
}

// ================================================================
//  ОСНОВНЫЕ ДЕЙСТВИЯ
// ================================================================

function checkAll() {
    const allWords = { ...words.h, ...words.v };
    for (const [id, data] of Object.entries(allWords)) {
        const numId = parseInt(id);
        if (solvedWords.has(numId)) continue;
        if (isWordFullyEntered(numId, data)) {
            if (checkWordCorrect(numId, data)) {
                lockWord(numId, data);
            } else {
                const cells = getWordCells(numId, data);
                for (const { row, col } of cells) {
                    const cell = getCell(row, col);
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
    const allWords = { ...words.h, ...words.v };
    for (const [id, data] of Object.entries(allWords)) {
        const numId = parseInt(id);
        if (solvedWords.has(numId)) {
            unlockWord(numId, data);
        }
    }

    const inputs = gridContainer.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
        input.disabled = false;
        input.parentElement.classList.remove('correct', 'incorrect', 'active-word');
    });

    for (const key in userAnswers) {
        delete userAnswers[key];
    }

    correctWordsCount = 0;
    updateScore();

    document.querySelectorAll('.clue-section li').forEach(el => {
        el.classList.remove('active-clue', 'solved-clue');
    });

    activeWordId = null;
    messageDiv.textContent = '🔄 Всё очищено! Начни заново.';
    messageDiv.style.color = '#b0b0ff';
}

function giveHint() {
    const allWords = { ...words.h, ...words.v };
    const availableWords = [];
    for (const [id, data] of Object.entries(allWords)) {
        const numId = parseInt(id);
        if (!solvedWords.has(numId)) {
            availableWords.push({ id: numId, data });
        }
    }

    if (availableWords.length === 0) {
        messageDiv.textContent = '🎉 Все слова уже угаданы!';
        return;
    }

    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    const { id, data } = randomWord;

    const cells = getWordCells(id, data);
    for (const { row, col } of cells) {
        const key = `${row},${col}`;
        if (!userAnswers[key] || userAnswers[key].trim() === '') {
            const idx = data.direction === 'h' ? col - data.col : row - data.row;
            const letter = data.answer[idx] || '';
            if (letter) {
                userAnswers[key] = letter;
                const cell = getCell(row, col);
                if (cell) {
                    const input = cell.querySelector('input');
                    if (input) {
                        input.value = letter;
                        cell.classList.add('hint');
                        setTimeout(() => cell.classList.remove('hint'), 1800);
                    }
                }
                messageDiv.textContent = `💡 Подсказка: буква "${letter}" в слове ${id}`;
                messageDiv.style.color = '#b0b0ff';

                if (isWordFullyEntered(id, data) && checkWordCorrect(id, data)) {
                    lockWord(id, data);
                    messageDiv.textContent = `🎉 Слово ${id} угадано!`;
                    messageDiv.style.color = '#8bff8b';
                }
                return;
            }
        }
    }

    messageDiv.textContent = '😅 Не удалось найти пустую клетку';
}

// ================================================================
//  РЕНДЕР
// ================================================================

function renderGrid() {
    gridContainer.innerHTML = '';
    const size = getCellSize();
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${size}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, ${size}px)`;

    const startPositions = {};
    wordsData.forEach(w => {
        const key = `${w.row},${w.col}`;
        if (!startPositions[key]) startPositions[key] = [];
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
                const key = `${r},${c}`;
                if (startPositions[key]) {
                    const numSpan = document.createElement('span');
                    numSpan.className = 'number';
                    numSpan.textContent = startPositions[key].join(',');
                    cell.appendChild(numSpan);
                }

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

                    if (activeWordId) {
                        const data = getWordById(activeWordId);
                        if (data && isWordFullyEntered(activeWordId, data)) {
                            if (checkWordCorrect(activeWordId, data)) {
                                lockWord(activeWordId, data);
                                messageDiv.textContent = '🎉 Слово угадано!';
                                messageDiv.style.color = '#8bff8b';
                                highlightWord(null);
                            } else {
                                const cells = getWordCells(activeWordId, data);
                                for (const { row, col } of cells) {
                                    const cellEl = getCell(row, col);
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

                    if (val.trim() !== '' && activeWordId) {
                        moveToNextCellInWord(activeWordId, r, c);
                    }
                });

                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Backspace' && this.value === '' && activeWordId) {
                        e.preventDefault();
                        const cells = getWordCells(activeWordId, getWordById(activeWordId));
                        let found = false;
                        for (const { row, col } of cells) {
                            if (found) {
                                const cell = getCell(row, col);
                                if (cell) {
                                    const inp = cell.querySelector('input');
                                    if (inp && !inp.disabled) {
                                        inp.focus();
                                        inp.select();
                                        return;
                                    }
                                }
                            }
                            if (row === r && col === c) found = true;
                        }
                    }
                    if (e.key === 'Enter' && activeWordId) {
                        e.preventDefault();
                        moveToNextCellInWord(activeWordId, r, c);
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

    for (const [id, data] of Object.entries(words.h)) {
        const li = document.createElement('li');
        li.dataset.id = id;
        li.innerHTML = `
            <span class="clue-number">${id}.</span>
            <span class="clue-text">${data.question}</span>
            <span class="clue-answer">${data.answer}</span>
        `;
        li.addEventListener('click', function() {
            const answerSpan = this.querySelector('.clue-answer');
            if (answerSpan) answerSpan.classList.toggle('show');
            highlightWord(parseInt(id));
        });
        hCluesList.appendChild(li);
    }

    for (const [id, data] of Object.entries(words.v)) {
        const li = document.createElement('li');
        li.dataset.id = id;
        li.innerHTML = `
            <span class="clue-number">${id}.</span>
            <span class="clue-text">${data.question}</span>
            <span class="clue-answer">${data.answer}</span>
        `;
        li.addEventListener('click', function() {
            const answerSpan = this.querySelector('.clue-answer');
            if (answerSpan) answerSpan.classList.toggle('show');
            highlightWord(parseInt(id));
        });
        vCluesList.appendChild(li);
    }
}

function getCellSize() {
    const width = window.innerWidth;
    if (width < 450) return 30;
    if (width < 700) return
