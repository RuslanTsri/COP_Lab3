import { useState } from 'react';
// Нам потрібна буде функція для генерації судоку (пізніше)
import { generateSudoku } from '../utils/sudoku';

export const useSudoku = () => {
    // --- СТАНИ ---
    // Стан для всієї сітки, яку бачить і редагує користувач
    const [grid, setGrid] = useState(null);
    // Стан для початкової сітки, щоб знати, які клітинки не можна редагувати
    const [initialGrid, setInitialGrid] = useState(null);
    // Стан для обраної клітинки { ряд, колонка }
    const [selectedCell, setSelectedCell] = useState(null);

    // --- ЛОГІКА ---
    /**
     * Починає нову гру, генеруючи нове поле судоку
     * @param {string} difficulty - Складність ('easy', 'medium', 'hard')
     */
    const createNewGame = (difficulty) => {
        const newSudoku = generateSudoku(difficulty);
        setGrid(newSudoku.puzzle);
        setInitialGrid(newSudoku.puzzle); // Зберігаємо початковий стан
    };

    /**
     * Обробляє клік по клітинці, встановлюючи її як активну
     * @param {number} row - Індекс рядка
     * @param {number} col - Індекс колонки
     */
    const handleCellSelect = (row, col) => {
        // Дозволяємо вибір тільки якщо клітинка порожня в початковій сітці
        if (initialGrid && initialGrid[row][col] === null) {
            setSelectedCell({ row, col });
        }
    };

    /**
     * Встановлює число у вибрану клітинку
     * @param {number} number - Число від 1 до 9
     */
    const handleNumberInput = (number) => {
        if (!selectedCell) return; // Якщо жодна клітинка не вибрана

        const { row, col } = selectedCell;

        // Створюємо копію сітки, щоб не мутувати стан напряму
        const newGrid = grid.map(r => [...r]);
        newGrid[row][col] = number;
        setGrid(newGrid);
    };

    // Повернення станів і функцій
    return {
        grid,
        selectedCell,
        createNewGame,
        handleCellSelect,
        handleNumberInput,
    };
};