import React from 'react';
import get from 'lodash/get';
import { useTranslate, useGetManyReference } from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabScrollButton from '@material-ui/core/Tabs/TabScrollButton';
import classnames from 'classnames';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: 0,
        maxWidth: 300,
        minHeight: 'unset',
        position: 'relative',
    },
    tab: {
        minHeight: 'unset',
        minWidth: 'unset',
        maxWidth: 'unset',
        paddingBottom: 0,
        paddingTop: 0,
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
    },
    tag: {
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'transparent',
        border: '1px solid',
        '& + &': {
            marginLeft: theme.spacing(),
        },
    },
    error: {
        color: theme.palette.error.main,
        marginBottom: theme.spacing(),
    },
}));

export const TagsField = props => {
    const {
        className,
        record,
        source,
        color = 'primary',
        variant = 'outlined',
        size = 'small',
    } = props;

    const classes = useStyles(props);
    const tags = get(record, source, []);

    return (
        <Tabs
            variant="scrollable"
            className={classes.root}
            scrollButtons="on"
            ScrollButtonComponent={TagsFieldScrollButton}
            component="ul"
            value={false}
        >
            {tags.map(tag => (
                <Tab
                    key={tag}
                    className={classes.tab}
                    disableFocusRipple
                    disableRipple
                    component="li"
                    value={tag}
                    label={
                        <Chip
                            label={tag}
                            className={classnames(classes.tag, className)}
                            color={color}
                            variant={variant}
                            size={size}
                        />
                    }
                />
            ))}
        </Tabs>
    );
};

export const TagsFieldScrollButton = props => {
    const { onClick, ...rest } = props;
    const handleClick = event => {
        event.stopPropagation();
        onClick(event);
    };

    return <TabScrollButton onClick={handleClick} {...rest} />;
};

export const AsyncTagsField = props => {
    const { id, variant = 'outlined', color = 'primary' } = props;
    const translate = useTranslate();
    const classes = useStyles(props);

    const { data, loaded, error } = useGetManyReference(
        'tags',
        'id',
        id,
        undefined,
        undefined,
        undefined,
        'apis'
    );

    if (!loaded) {
        return <LinearProgress />;
    }

    if (error) {
        return (
            <Typography variant="body2" className={classes.error}>
                {translate('ra.page.error')}
            </Typography>
        );
    }

    const tags = data ? Object.keys(data).map(key => data[key]) : [];

    return (
        <>
            {tags.map(tag => (
                <Chip
                    key={tag.id}
                    label={tag.name}
                    className={classes.tag}
                    variant={variant}
                    color={color}
                />
            ))}
        </>
    );
};
