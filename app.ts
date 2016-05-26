/// <reference path="typings/tsd.d.ts" />

import { Component } from "@angular/core";
import { bootstrap } from "@angular/platform-browser-dynamic";

@Component({
    selector: 'app',
    template: '<div>app 3</div>'
})
export class App {}

bootstrap(App);