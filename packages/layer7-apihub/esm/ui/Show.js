import React from 'react';
import { Show as RaShow } from 'react-admin';
import { ViewTitle } from './ViewTitle';
export const Show = props => (React.createElement(React.Fragment, null,
    React.createElement(ViewTitle, null),
    React.createElement(RaShow, Object.assign({}, props))));
//# sourceMappingURL=Show.js.map