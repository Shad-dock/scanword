// ================================================================
//  ДАННЫЕ СКАНВОРДА
//  Каждая клетка: { letter: 'А', question: 'Вопрос' }
//  0 = чёрная клетка
// ================================================================

const crosswordData = {
    grid: [
        //  0   1   2   3   4   5   6   7   8   9
        [{ letter: 'К', question: 'Домашний любимец' }, { letter: 'О', question: '' }, { letter: 'Т', question: '' }, 0, { letter: 'С', question: 'Ночная птица' }, { letter: 'О', question: '' }, { letter: 'В', question: '' }, 0, { letter: 'М', question: 'Согласие' }, { letter: 'И', question: '' }],
        [{ letter: 'С', question: 'Огромный с хоботом' }, 0, 0, 0, 0, 0, 0, 0, 0, { letter: 'Р', question: '' }],
        [{ letter: 'Т', question: 'Полосатый хищник' }, 0, { letter: 'З', question: 'Длинноухий' }, { letter: 'А', question: '' }, 0, { letter: 'М', question: 'Косолапый' }, 0, { letter: 'Е', question: 'Полоскун' }, { letter: 'Н', question: '' }, 0],
        [0, 0, { letter: 'Я', question: '' }, { letter: 'Ц', question: '' }, 0, { letter: 'Е', question: '' }, 0, { letter: 'О', question: '' }, { letter: 'Т', question: '' }, 0],
        [{ letter: 'В', question: 'Чёрная птица' }, 0, { letter: 'С', question: 'Белая болтушка' }, 0, { letter: 'Г', question: 'Врановые' }, { letter: 'А', question: '' }, 0, { letter: 'С', question: 'Синяя птичка' }, 0, { letter: 'Д', question: 'Стучит по дереву' }],
        [0, 0, { letter: 'О', question: '' }, 0, { letter: 'Л', question: '' }, { letter: 'Й', question: '' }, 0, { letter: 'И', question: '' }, 0, { letter: 'Я', question: '' }],
        [{ letter: 'К', question: 'Даёт молоко' }, 0, { letter: 'Б', question: 'Даёт шерсть' }, 0, { letter: 'С', question: 'Даёт сало' }, { letter: 'В', question: '' }, 0, { letter: 'К', question: 'Даёт мясо' }, 0, { letter: 'С', question: 'Друг человека' }],
        [0, 0, { letter: 'А', question: '' }, 0, { letter: 'В', question: '' }, { letter: 'И', question: '' }, 0, { letter: 'О', question: '' }, 0, { letter: 'О', question: '' }],
        [{ letter: 'М', question: 'Маленький серый' }, 0, { letter: 'К', question: 'С длинным хвостом' }, { letter: 'Р', question: '' }, 0, { letter: 'Ё', question: 'Колючий' }, { letter: 'Ж', question: '' }, 0, { letter: 'Л', question: 'Хитрая' }, 0],
        [0, 0, { letter: 'Р', question: '' }, { letter: 'Ы', question: '' }, 0, { letter: 'Ж', question: '' }, { letter: 'Ж', question: '' }, 0, { letter: 'И', question: '' }, 0]
    ]
};

// Собираем слова из сетки
function buildWordsFromGrid(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const words = { h: {}, v: {} };
    let wordId = 1;

    // Горизонтальные слова
    for (let r = 0; r < rows; r++) {
        let c = 0;
        while (c < cols) {
            if (grid[r][c] !== 0) {
                let start = c;
                let word = '';
                while (c < cols && grid[r][c] !== 0) {
                    word += grid[r][c].letter;
                    c++;
                }
                if (word.length > 1) {
                    words.h[wordId] = {
                        row: r,
                        col: start,
                        length: word.length,
                        answer: word,
                        letters: word.split('')
                    };
                    wordId++;
                }
            } else {
                c++;
            }
        }
    }

    // Вертикальные слова
    for (let c = 0; c < cols; c++) {
        let r = 0;
        while (r < rows) {
            if (grid[r][c] !== 0) {
                let start = r;
                let word = '';
                while (r < rows && grid[r][c] !== 0) {
                    word += grid[r][c].letter;
                    r++;
                }
                if (word.length > 1) {
                    words.v[wordId] = {
                        row: start,
                        col: c,
                        length: word.length,
                        answer: word,
                        letters: word.split('')
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

const grid = crosswordData.grid;
const words = buildWordsFromGrid(grid);

const userAnswers = {};
const solvedWords = new Set();

const gridContainer = document.getElementById('crossword-grid');
const messageDiv = document.getElementById('message');
const correctSpan = document.getElementById('correctCount');
const totalSpan = document.getElementById('totalCount');

let totalWordsCount = Object.keys(words.h).length + Object.keys(words.v).length;
let correctWordsCount = 0;

// ================================================================
//  ФУНКЦИИ
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
            return { id, data, dir: 'h' };
        }
    }
    for (const [id, data] of Object.entries(words.v)) {
        if (data.col === col && data.row <= row && row < data.row + data.length) {
            return { id, data, dir: 'v' };
        }
    }
    return null;
}

function checkWord(id, data) {
    let word = '';
    for (let i = 0; i < data.length; i++) {
        const r = data.row + (data.rowDelta || 0);
        const c = data.col + (data.colDelta || 0);
        // Используем row/col напрямую
        const rr = data.row;
        const cc = data.col + i;
        const key = `${rr},${cc}`;
        word += (userAnswers[key] || '').toUpperCase();
    }
    return word === data.answer;
}

// Исправленная проверка слова
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

function checkAll() {
    let anyIncorrect = false;

    for (const [id, data] of Object.entries(words.h)) {
        if (solvedWords.has(parseInt(id))) continue;
        const isCorrect = checkWordCorrect(id, data);
        if (isCorrect) {
            lockWord(parseInt(id), data);
        } else {
            // Проверим, есть ли хоть одна буква
            let hasLetters = false;
            for (let i = 0; i < data.length; i++) {
                const r = data.row;
                const c = data.col + i;
                const key = `${r},${c}`;
                if (userAnswers[key] && userAnswers[key].trim() !== '') {
                    hasLetters = true;
                    break;
                }
            }
            if (hasLetters) {
                anyIncorrect = true;
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
        if (solvedWords.has(parseInt(id))) continue;
        const isCorrect = checkWordCorrect(id, data);
        if (isCorrect) {
            lockWord(parseInt(id), data);
        } else {
            let hasLetters = false;
            for (let i = 0; i < data.length; i++) {
                const r = data.row + i;
                const c = data.col;
                const key = `${r},${c}`;
                if (userAnswers[key] && userAnswers[key].trim() !== '') {
                    hasLetters = true;
                    break;
                }
            }
            if (hasLetters) {
                anyIncorrect = true;
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
    } else if (anyIncorrect) {
        messageDiv.textContent = '🔴 Есть ошибки. Красные клетки — проверь!';
        messageDiv.style.color = '#ff6b6b';
    } else {
        messageDiv.textContent = '✅ Всё правильно! Продолжай заполнять!';
        messageDiv.style.color = '#8bff8b';
    }
}

function resetAll() {
    for (const [id, data] of Object.entries(words.h)) {
        if (solvedWords.has(parseInt(id))) {
            unlockWord(parseInt(id), data);
        }
    }
    for (const [id, data] of Object.entries(words.v)) {
        if (solvedWords.has(parseInt(id))) {
            unlockWord(parseInt(id), data);
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

        // Проверяем, не угадано ли всё слово
        const isComplete = checkWordCorrect(id, data);
        if (isComplete) {
            lockWord(parseInt(id), data);
            messageDiv.textContent = `💡 Подсказка: буква "${letter}". Слово угадано! 🎉`;
            messageDiv.style.color = '#8bff8b';
        } else {
            messageDiv.textContent = `💡 Подсказка: буква "${letter}"`;
            messageDiv.style.color = '#b0b0ff';
        }
    }
}

function moveToNextCell(row, col) {
    const nextCol = col + 1;
    if (nextCol >= grid[0].length) return;
    const nextCell = getCell(row, nextCol);
    if (nextCell && !nextCell.classList.contains('black')) {
        const input = nextCell.querySelector('input');
        if (input && !input.disabled) {
            input.focus();
            input.select();
        } else if (input && input.disabled) {
            // Если клетка заблокирована, ищем дальше
            moveToNextCell(row, nextCol);
        }
    } else {
        // Если следующая чёрная, ищем дальше
        moveToNextCell(row, nextCol);
    }
}

function updateScore() {
    correctSpan.textContent = correctWordsCount;
    totalSpan.textContent = totalWordsCount;
}

// ================================================================
//  РЕНДЕР
// ================================================================

function renderGrid() {
    gridContainer.innerHTML = '';
    const rows = grid.length;
    const cols = grid[0].length;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = r;
            cell.dataset.col = c;

            const data = grid[r][c];

            if (data === 0) {
                cell.classList.add('black');
            } else {
                // Номер клетки (если это первая буква слова)
                let isStart = false;
                let startNum = null;
                for (const [id, word] of Object.entries(words.h)) {
                    if (word.row === r && word.col === c) {
                        isStart = true;
                        startNum = id;
                        break;
                    }
                }
                if (!isStart) {
                    for (const [id, word] of Object.entries(words.v)) {
                        if (word.row === r && word.col === c) {
                            isStart = true;
                            startNum = id;
                            break;
                        }
                    }
                }

                if (isStart && startNum) {
                    const numSpan = document.createElement('span');
                    numSpan.className = 'number';
                    numSpan.textContent = startNum;
                    cell.appendChild(numSpan);
                }

                // Вопрос
                if (data.question && data.question.trim() !== '') {
                    const questionSpan = document.createElement('span');
                    questionSpan.className = 'question';
                    questionSpan.textContent = data.question;
                    cell.appendChild(questionSpan);
                }

                // Поле ввода
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
                    this.parentElement.classList.remove('incorrect');

                    // Проверяем, не угадано ли слово
                    const wordInfo = getWordForCell(r, c);
                    if (wordInfo) {
                        const { id, data: wordData } = wordInfo;
                        if (!solvedWords.has(parseInt(id))) {
                            const isComplete = checkWordCorrect(id, wordData);
                            if (isComplete) {
                                lockWord(parseInt(id), wordData);
                                messageDiv.textContent = '🎉 Слово угадано!';
                                messageDiv.style.color = '#8bff8b';
                            }
                        }
                    }

                    // Автопереход
                    if (val.trim() !== '') {
                        moveToNextCell(r, c);
                    }
                });

                input.addEventListener('keydown', function (e) {
                    if (e.key === 'Backspace' && this.value === '') {
                        // Переход на предыдущую клетку
                        const prevCol = c - 1;
                        if (prevCol >= 0) {
                            const prevCell = getCell(r, prevCol);
                            if (prevCell && !prevCell.classList.contains('black')) {
                                const prevInput = prevCell.querySelector('input');
                                if (prevInput && !prevInput.disabled) {
                                    prevInput.focus();
                                    prevInput.select();
                                }
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

// ================================================================
//  ИНИЦИАЛИЗАЦИЯ
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    totalSpan.textContent = totalWordsCount;
    correctSpan.textContent = 0;

    document.getElementById('checkBtn').addEventListener('click', checkAll);
    document.getElementById('resetBtn').addEventListener('click', resetAll);
    document.getElementById('hintBtn').addEventListener('click', giveHint);

    messageDiv.textContent = '🧩 Вписывай буквы — слова будут угадываться автоматически!';
});
