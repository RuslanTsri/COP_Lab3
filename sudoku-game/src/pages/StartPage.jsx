import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingsSchema } from '../utils/validationSchemas';
import Button from '../components/UI/Button/Button';

const StartPage = ({ onGameStart, defaultSettings }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(settingsSchema),
        defaultValues: defaultSettings, 
    });


    const onSubmit = (data) => {
        onGameStart(data); // Передаємо всі дані з форми
    };

    return (
        <div>
            <h1>Налаштування гри Судоку</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="playerName">Ім'я гравця:</label>
                    <input id="playerName" {...register('playerName')} />
                    <p style={{color: 'red'}}>{errors.playerName?.message}</p>
                </div>

                <div>
                    <label>Складність:</label>
                    <select {...register('difficulty')}>
                        <option value="easy">Легка</option>
                        <option value="medium">Середня</option>
                        <option value="hard">Складна</option>
                    </select>
                    <p style={{color: 'red'}}>{errors.difficulty?.message}</p>
                </div>

                <Button type="submit">Почати гру</Button>
            </form>
        </div>
    );
};

StartPage.propTypes = {
    onGameStart: PropTypes.func.isRequired,
    defaultSettings: PropTypes.object,
};

export default StartPage;