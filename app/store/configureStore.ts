import { rootMutableReducer } from './mutableReducer';
import { createStore, applyMiddleware, compose } from 'redux';

declare var window: Window & DevToolsExtension;

export const configureStore = () => {
    const devMode = true; //TODO

    var composeFix: any = compose;

    let enhancers = [];

    if (devMode && window && window.devToolsExtension) {
        enhancers = [...enhancers, window.devToolsExtension()];
    }

    var Immutable = require('seamless-immutable');
    const store = composeFix(...enhancers)(createStore)(rootMutableReducer, Immutable({
        clicksCount: 0,
        name: '123',
        someData: {
            id: 44
        }
    }));

    return store;
};