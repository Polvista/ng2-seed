'use strict';

import { bootstrap } from "@angular/platform-browser-dynamic";
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import {App} from "./App";
import {HTTP_PROVIDERS} from "@angular/http";
import {provide} from "@angular/core";
import { provider } from  'ng2-redux';

import { rootMutableReducer } from './store/mutableReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import {Store} from "./store/Store";

const APP_CONST: string = 'someString';
const CONSTANTS: any[] = [
    provide('APP_CONST', {useValue: APP_CONST})
];

const devMode = true; //TODO

declare var window;
declare var Immutable;

let enhancers = [];

if (devMode && window && window.devToolsExtension) {
    enhancers = [...enhancers, window.devToolsExtension()];
}
const store = compose(...enhancers)(createStore)(rootMutableReducer, Immutable({
    clicksCount: 0,
    name: '123',
    someData: {
        id: 44
    }
}));

bootstrap(App, [HTTP_PROVIDERS, ROUTER_PROVIDERS, CONSTANTS, provider(store), Store]);