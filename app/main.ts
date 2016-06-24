'use strict';

import { bootstrap } from "@angular/platform-browser-dynamic";
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { App } from "./App";
import { HTTP_PROVIDERS } from "@angular/http";
import { provider } from  'ng2-redux';
import { configureStore } from './store/configureStore';

bootstrap(App,
    [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        provider(configureStore())
    ]
);