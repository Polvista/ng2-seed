/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/custom.d.ts" />

import { Component, ElementRef, AfterContentInit, ApplicationRef, OnDestroy } from "@angular/core";
import { ROUTER_DIRECTIVES } from '@angular/router';
import {ReduxTestComponent} from "./redux/ReduxTestComponent";
import {AppState} from "./store/AppState";
import {Store} from "./store/Store";
import {ImmutableWithMutations} from "./immutable/withMutations/ImmutableWithMutations";


@Component({
    selector: 'app',
    template: `

        Hello

        <a [routerLink]="['/about']">show about</a>
        <a [routerLink]="['/']">show tests</a>

        <router-outlet></router-outlet>

        <immutable-with-mutations>
        </immutable-with-mutations>
    `,
    directives: [ROUTER_DIRECTIVES, ImmutableWithMutations],
    providers: [Store]
})
export class App implements AfterContentInit, OnDestroy {
    constructor(private store: Store) {
    }

    ngAfterContentInit() {
    }

    ngOnDestroy() {
    }

}
