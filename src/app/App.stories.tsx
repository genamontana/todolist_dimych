import React from 'react';
import App from './App';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';


export default {
    title: 'App Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
};

export const AppBaseExample = (props:any)=> {
    return(<App demo={true}/>)
}