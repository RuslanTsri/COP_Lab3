import React from 'react';

const ResultsPage = ({ onRestart }) => {
    return (
        <div>
            <h1>Гра завершена!</h1>
            <p>Ваш результат: (тут буде час або очки)</p>
            <button onClick={onRestart}>Грати знову</button>
        </div>
    );
};

export default ResultsPage;