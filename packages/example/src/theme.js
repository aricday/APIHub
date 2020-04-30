import { theme } from 'layer7-apihub';

export const CHANGE_THEME = 'CHANGE_THEME';

export const themeReducer = (previousState = 'light', { type, payload }) => {
    if (type === CHANGE_THEME) {
        return payload;
    }
    return previousState;
};

export const changeTheme = newTheme => ({
    type: CHANGE_THEME,
    payload: newTheme,
});

export const darkTheme = {
    ...theme,
    palette: {
        ...theme.palette,
        primary: {
            main: '#90caf9',
        },
        type: 'dark',
    },
};

export const lightTheme = theme;
