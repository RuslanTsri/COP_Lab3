import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../components/UI/Modal/Modal';
import Button from '../components/UI/Button/Button';
import Board from '../components/Board/Board';
import { useSudoku } from '../hooks/useSudoku';

const GamePage = ({ settings, onGameEnd }) => {
    const { grid, createNewGame, selectedCell, handleCellSelect, handleNumberInput } = useSudoku();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (settings.difficulty) {
            createNewGame(settings.difficulty);
        }
    }, [settings.difficulty]);

    const handleFinishGame = () => {
        setIsModalOpen(true);
    };

    // ✅ ОЦЕЙ РЯДОК - ВАШ ЗАПОБІЖНИК
    // Якщо сітка ще не згенерована, показуємо повідомлення про завантаження
    if (!grid) {
        return <div>Генерація поля...</div>;
    }

    return (
        <div>
            <h2>Гравець: {settings.playerName}, Складність: {settings.difficulty}</h2>
            <Board
                grid={grid}
                selectedCell={selectedCell}
                onCellSelect={handleCellSelect}
            />
            <Button onClick={handleFinishGame}>Завершити гру</Button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Гру завершено!</h2>
                <p>Вітаємо, {settings.playerName}!</p>
                <Button onClick={onGameEnd}>Перейти до результатів</Button>
                <Button onClick={() => window.location.reload()}>Почати цей тур заново</Button>
            </Modal>
        </div>
    );
};

GamePage.propTypes = {
    settings: PropTypes.object.isRequired,
    onGameEnd: PropTypes.func.isRequired,
};

export default GamePage;