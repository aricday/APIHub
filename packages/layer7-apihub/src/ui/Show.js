import React from 'react';
import { Show as RaShow } from 'react-admin';
import { ViewTitle } from './ViewTitle';

export const Show = props => (
    <>
        <ViewTitle />
        <RaShow {...props} />
    </>
);
