'use strict';

import './app.scss';

import { bootstrap } from "@angular/platform-browser-dynamic";
import { App } from "./AppComponent";
import { routes } from "./routes";
/*
import { HTTP_PROVIDERS } from "@angular/http";
*/
import { NgRedux } from  'ng2-redux';
import { enableProdMode } from '@angular/core';
import { provideRouter, RouterConfig } from '@angular/router';


if (process.env.ENV === 'production') {
    enableProdMode();
}

const bootstrapApp = (initialHMRstate?: any): Promise<any> => {
    return bootstrap(App,
        [
            /*HTTP_PROVIDERS,
             ROUTER_PROVIDERS,*/
            /*NgRedux*/
            provideRouter(routes)
        ]
    );
};

if (process.env.ENV === 'development') {
    let ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(bootstrapApp, module);
} else {
    document.addEventListener('DOMContentLoaded', () => bootstrapApp());
}