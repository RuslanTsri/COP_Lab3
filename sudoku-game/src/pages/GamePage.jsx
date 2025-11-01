import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Board from '../components/Board/Board';
// Імпорт кастомного хуку
import { useSudoku } from '../hooks/useSudoku';


const GamePage = ({ difficulty, onGameEnd }) => {
    // Використання хуку, отримуючи з нього все необхідне
    const { grid, selectedCell, createNewGame, handleCellSelect, handleNumberInput } = useSudoku();


    useEffect(() => {
        createNewGame(difficulty);
    }, [difficulty]); // Залежність

    // Якщо поле ще не згенеровано, показуємо завантаження
    if (!grid) {
        return <div>Генерація поля...</div>;
    }

    return (
        <div>
            <h2>Складність: {difficulty}</h2>
            <Board
                grid={grid}
                selectedCell={selectedCell}
                onCellSelect={handleCellSelect}
            />

            <div>
                <p>Панель для вводу чисел (у майбутньому)</p>
            </div>
            <button onClick={onGameEnd}>Завершити гру</button>
        </div>
    );
};

GamePage.propTypes = {
    difficulty: PropTypes.string.isRequired,
    onGameEnd: PropTypes.func.isRequired,
};

export default GamePage;