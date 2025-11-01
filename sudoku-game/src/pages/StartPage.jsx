import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingsSchema } from '../utils/validationSchemas';
import Button from '../components/UI/Button/Button';

const StartPage = ({ onGameStart, defaultSettings }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(settingsSchema),

        defaultValues: defaultSettings,
    });


    useEffect(() => {

        console.log("useEffect спрацював з налаштуваннями:", defaultSettings);
        if (defaultSettings) {

            reset(defaultSettings);
        }
    }, [defaultSettings, reset]);

    const onSubmit = (data) => {
        onGameStart(data);
    };

    const onError = (errorList) => {
        console.error("Помилки валідації:", errorList);
    };

    return (
        <div>
            <h1>Налаштування гри Судоку</h1>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div>
                    <label htmlFor="playerName">Ім'я гравця:</label>
                    <input id="playerName" {...register('playerName')} />
                    {errors.playerName && <p style={{color: 'red'}}>{errors.playerName.message}</p>}
                </div>

                <div>
                    <label>Складність:</label>
                    <select {...register('difficulty')}>
                        <option value="easy">Легка</option>
                        <option value="medium">Середня</option>
                        <option value="hard">Складна</option>
                    </select>
                    {errors.difficulty && <p style={{color: 'red'}}>{errors.difficulty.message}</p>}
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