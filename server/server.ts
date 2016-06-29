import { App } from '../app/AppComponent';

import * as express from 'express';

const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(9999, function () {
    console.log('Example app listening on port 3000!');
});