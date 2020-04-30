import React from 'react';
import get from 'lodash/get';
import pure from 'recompose/pure';
import Link from '@material-ui/core/Link';

export const LinkField = pure(
    ({ addLabel, className, source, record = {}, ...rest }) => (
        <Link className={className} href={get(record, source)} {...rest}>
            {get(record, source)}
        </Link>
    )
);

LinkField.defaultProps = {
    addLabel: true,
};

LinkField.displayName = 'LinkField';

export default LinkField;
