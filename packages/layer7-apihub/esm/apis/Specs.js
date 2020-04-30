import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Applications } from './Application';
import { Swagger } from './Swagger';
const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightBold,
        padding: theme.spacing(),
        '& .swagger-ui .wrapper': {
            maxWidth: 'unset',
        },
    },
}));
export const Specs = ({ record }) => {
    const classes = useStyles();
    return (React.createElement("div", { className: classes.root },
        React.createElement(Applications, { id: record.id }),
        React.createElement(Swagger, { id: record.id })));
};
//# sourceMappingURL=Specs.js.map