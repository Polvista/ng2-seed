/// <reference path="../typings/tsd.d.ts" />


import { Component, ElementRef, Query, QueryList, AfterContentInit, ApplicationRef, OnDestroy, Inject } from "@angular/core";
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {AppService} from "./AppService";
import {User} from "./AppService";
import {BehaviorSubject, Subject, Observable} from 'rxjs';
import {DataComponent} from "./data/DataComponent";
import {DataResultComponent} from "./data/DataResultComponent";
import {QuoteComponent} from "./quote/QuoteComponent";
import {Quote} from "./quote/Quote";
import {Alert} from "./alert/AlertDirective";
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
    title: string = 'title';
    currentUser: Subject<User>;
    keyups: Observable<any>;
    jobsQuote: Quote;
    showOldTests = false;
    private unsubscribeFromDevTools: () => void;

    constructor(private store: Store,
                applicationRef: ApplicationRef
                /*private appService: AppService,
                private el: ElementRef,
                store: Store,
                applicationRef: ApplicationRef*/) {


        //this.appService.currentUser.subscribe((user: User) => console.log(user));
        //this.currentUser = appService.currentUser;

        //console.log(el);
        //this.keyups = Observable.fromEvent(this.el.nativeElement, 'keyup').map(e => e.target.value);

        //this.jobsQuote = new Quote("Steve Jobs", "Quality is much better than quantity. One home run is much better than two doubles.");

        //console.log('quote', quotes.toArray());


        this.unsubscribeFromDevTools = this.store.subscribe(() => applicationRef.tick()); //TODO in dev mode
    }

    ngAfterContentInit() {
        //console.log('quote after', this.quotes.toArray());
    }

    ngOnDestroy() {
        this.unsubscribeFromDevTools && this.unsubscribeFromDevTools();
    }


    log(message: string) {
        console.log(message);
    }

    getName(user: User){
        return user ? user.name : '';
    }

}