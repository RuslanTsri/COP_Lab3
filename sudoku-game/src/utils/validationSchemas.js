import * as yup from 'yup';

export const settingsSchema = yup.object().shape({
    difficulty: yup.string().oneOf(['easy', 'medium', 'hard']).required("Рівень складності є обов'язковим"),

    playerName: yup.string().max(15, 'Ім\'я занадто довге').default('Гравець 1'),
});