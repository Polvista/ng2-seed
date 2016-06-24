/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/custom.d.ts" />

import './app.css';

import { Component, ElementRef, AfterContentInit, ApplicationRef, OnDestroy } from "@angular/core";
import {ReduxTestComponent} from "./redux/ReduxTestComponent";
import {AppState} from "./store/AppState";
import {Store} from "./store/Store";
import {ImmutableWithMutations} from "./immutable/withMutations/ImmutableWithMutations";


@Component({
    selector: 'app',
    template: `

        Hello

        <redux-test></redux-test>

        <immutable-with-mutations>
        </immutable-with-mutations>
    `,
    directives: [ReduxTestComponent],
    providers: [Store]

    /*,
    directives: [ROUTER_DIRECTIVES, NameComp, QuoteComponent, Alert, ReduxTestComponent, ImmutableWithMutations],
    providers: [AppService]*/

})
export class App implements AfterContentInit, OnDestroy {
    private unsubscribeFromDevTools: () => void;

    constructor(private store: Store,
                applicationRef: ApplicationRef) {

        this.unsubscribeFromDevTools = this.store.subscribe(() => applicationRef.tick()); //TODO in dev mode
    }

    ngAfterContentInit() {
        //console.log('quote after', this.quotes.toArray());
    }

    ngOnDestroy() {
        this.unsubscribeFromDevTools && this.unsubscribeFromDevTools();
    }

}