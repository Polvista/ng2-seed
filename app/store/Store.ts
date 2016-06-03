import {rootReducer} from './RootReducer';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(rootReducer);

export let store = store;