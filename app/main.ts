import { bootstrap } from "@angular/platform-browser-dynamic";
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import {App} from "./App";
import {HTTP_PROVIDERS} from "@angular/http";
import {provide} from "@angular/core";
import { provider } from  'ng2-redux';

import { store } from './store/Store';

const APP_CONST: string = 'someString';
const CONSTANTS: any[] = [
    provide('APP_CONST', {useValue: APP_CONST})
];

bootstrap(App, [HTTP_PROVIDERS, ROUTER_PROVIDERS, CONSTANTS, provider(store)]);