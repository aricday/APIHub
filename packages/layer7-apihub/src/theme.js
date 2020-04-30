import { defaultTheme } from 'react-admin';
import defaultMuiTheme from '@material-ui/core/styles/defaultTheme';

import blue from '@material-ui/core/colors/blue';

export const theme = {
    ...defaultTheme,
    palette: {
        ...defaultTheme.palette,
        secondary: {
            ...defaultTheme.palette.secondary,
            light: '#6ec6ff',
            main: '#43425D',
            dark: '#0069c0',
            contrastText: defaultMuiTheme.palette.common.white,
        },
    },
    overrides: {
        RaMenuItemLink: {
            root: {
                color: defaultMuiTheme.palette.common.white,
                borderLeftColor: 'transparent',
                borderLeftWidth: defaultMuiTheme.spacing(0.5),
                borderLeftStyle: 'solid',
                paddingTop: defaultMuiTheme.spacing(2),
                paddingBottom: defaultMuiTheme.spacing(2),
            },
            active: {
                borderLeftColor: blue[800],
                borderLeftWidth: defaultMuiTheme.spacing(0.5),
                borderLeftStyle: 'solid',
                backgroundColor: defaultMuiTheme.palette.action.selected,
                color: defaultMuiTheme.palette.common.white,
                '& svg': {
                    color: '#a3a0fb',
                },
            },
            icon: {
                color: defaultMuiTheme.palette.common.white,
            },
        },
    },
};
