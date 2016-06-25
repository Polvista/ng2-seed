'use strict';

import { bootstrap } from "@angular/platform-browser-dynamic";
/*
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
*/
import { App } from "./AppComponent";
/*
import { HTTP_PROVIDERS } from "@angular/http";
*/
import { NgRedux } from  'ng2-redux';
import { configureStore } from './store/configureStore';
import { enableProdMode } from '@angular/core';

if (process.env.ENV === 'production') {
    enableProdMode();
}

const bootstrapApp = (initialHMRstate?: any): Promise<any> => {
    return bootstrap(App,
        [
            /*HTTP_PROVIDERS,
             ROUTER_PROVIDERS,*/
            /*NgRedux*/
        ]
    );
};

if (process.env.ENV === 'development') {
    let ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(bootstrapApp, module);
} else {
    // bootstrap when document is ready
    document.addEventListener('DOMContentLoaded', () => bootstrapApp());
}