import { rootMutableReducer } from './mutableReducer';
import { createStore, applyMiddleware, compose } from 'redux';

declare var window: Window & DevToolsExtension;

export const configureStore = () => {
    const composeFix: any = compose;
    let enhancers = [];

    if (process.env.ENV === 'development' && window && window.devToolsExtension) {
        enhancers = [...enhancers, window.devToolsExtension()];
    }

    const Immutable = require('seamless-immutable');
    const store = composeFix(...enhancers)(createStore)(rootMutableReducer, Immutable({
        clicksCount: 0,
        name: '123',
        someData: {
            id: 44
        }
    }));

    return store;
};