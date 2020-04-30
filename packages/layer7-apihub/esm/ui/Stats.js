import React, { cloneElement } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
const useStatsStyles = makeStyles(theme => ({
    root: {
        marginRight: theme.spacing(2),
        width: 'auto',
    },
    icon: {
        marginRight: theme.spacing(),
    },
}));
export const Stats = ({ children, icon, title }) => {
    const classes = useStatsStyles();
    return (React.createElement(Tooltip, { title: title },
        React.createElement(Grid, { container: true, alignItems: "center", className: classes.root },
            cloneElement(icon, {
                className: classNames(classes.icon, icon.className),
            }),
            children)));
};
export const StatsText = ({ children }) => {
    const classes = useStatsStyles();
    return (React.createElement(Typography, { variant: "caption", color: "textSecondary", className: classes.text }, children));
};
//# sourceMappingURL=Stats.js.map