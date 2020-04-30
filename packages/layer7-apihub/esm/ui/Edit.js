import React from 'react';
import { Edit as RaEdit } from 'react-admin';
import { ViewTitle } from './ViewTitle';
export const Edit = props => (React.createElement(React.Fragment, null,
    React.createElement(ViewTitle, null),
    React.createElement(RaEdit, Object.assign({}, props))));
//# sourceMappingURL=Edit.js.map