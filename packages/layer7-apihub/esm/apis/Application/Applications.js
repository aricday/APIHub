import React, { useState } from 'react';
import { useTranslate, useGetList } from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { ApplicationCredentials } from './ApplicationCredentials';
const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: theme.typography.body2.fontFamily,
        padding: '0px 20px',
    },
    formControl: {
        minWidth: '240px',
    },
}));
export const Applications = ({ id }) => {
    const translate = useTranslate();
    const classes = useStyles();
    const { data, loaded, error } = useGetList('applications', undefined, { field: 'name', order: 'ASC' }, {
        apiUuid: id,
    });
    const [selectedApi, setSelectedApi] = useState(null);
    const handleChange = event => {
        const selectedApiId = event.target.value;
        if (!data) {
            return;
        }
        setSelectedApi(data[selectedApiId]);
    };
    if (!loaded) {
        return React.createElement(LinearProgress, null);
    }
    if (!data || error) {
        return (React.createElement(Typography, { variant: "body2", color: "error" }, translate('ra.page.error')));
    }
    const applications = Object.keys(data).map(key => data[key]);
    if (applications.length === 0) {
        return null;
    }
    return (React.createElement("div", { className: classes.root },
        React.createElement(Grid, { container: true, spacing: 3 },
            React.createElement(Grid, { item: true, xs: 7 },
                React.createElement(Typography, { variant: "h6", color: "textSecondary", gutterBottom: true }, translate('resources.apis.specification.actions.select_application')),
                React.createElement(FormControl, { className: classes.formControl },
                    React.createElement(InputLabel, { id: "select-application-label" }, translate('resources.apis.specification.fields.select_application_label')),
                    React.createElement(Select, { labelId: "select-application-label", value: selectedApi ? selectedApi.id : '', onChange: handleChange }, applications.map(({ id, name }) => (React.createElement(MenuItem, { key: id, value: id }, name)))))),
            React.createElement(Grid, { item: true, xs: 5 }, selectedApi && (React.createElement(ApplicationCredentials, { id: selectedApi.id }))))));
};
//# sourceMappingURL=Applications.js.map