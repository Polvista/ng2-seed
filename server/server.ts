import 'angular2-universal/polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { expressEngine } from 'angular2-universal';

// enable prod for faster renders
enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

// Express View
app.engine('.html', expressEngine);
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(bodyParser.json());

// Serve static files
app.use(express.static(ROOT, {index: false}));

import { ngApp } from './main.server';

// Routes with html5pushstate
app.use('/', ngApp);

// Server
app.listen(9999, () => {
    console.log('Listening on: http://localhost:3000');
});