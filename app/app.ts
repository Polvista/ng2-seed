/// <reference path="../typings/tsd.d.ts" />

import { Component, ElementRef, Query, QueryList, AfterContentInit } from "@angular/core";
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {Name} from "./name.model";
import {NameComp} from "./name.component";
import {AppService} from "./AppService";
import {User} from "./AppService";
import {BehaviorSubject, Subject, Observable} from 'rxjs';
import {DataComponent} from "./data/DataComponent";
import {DataResultComponent} from "./data/DataResultComponent";
import {QuoteComponent} from "./quote/QuoteComponent";
import {Quote} from "./quote/Quote";
import {Alert} from "./alert/AlertDirective";
import {ReduxTestComponent} from "./redux/ReduxTestComponent";

@Component({
    selector: 'app',
    template: `
        <redux-test></redux-test>

        <div *ngIf="showOldTests">
            <div>app 5 {{ title }}</div>

            <div>
                <form (submit)="add(text)">
                    <input #text type="text" (keydown.space)="log('space')">
                    <input type="submit">
                </form>
            </div>

            Keyups: <span class="text">{{ keyups | async }}</span>

            <br/><br/>

            Names:
            <div>
                <name *ngFor="let name of names" [name]="name" (event)="log($event)"></name>
            </div>

            <br/>

            <div>User: {{ getName(currentUser | async) }}</div>

            <br/>

            <a [routerLink]="['/']">To home</a><br/>
            <a [routerLink]="['/data']">To data</a><br>
            <router-outlet></router-outlet>

            <br/>


            Styles tests:

            <br/><br/>

            <quote [quote]="jobsQuote">
                <span>Transcluded as expected</span>
            </quote>

            <br><br>

            <div alert="Hello!" [quote]="jobsQuote" #alert="alert">Get free alert!</div>
            <button (click)="alert.showAlert()">Or get your alert here</button>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, NameComp, QuoteComponent, Alert, ReduxTestComponent],
    providers: [AppService]

})
@Routes([
    { path: '/data', component: DataComponent}
])
export class App implements AfterContentInit {
    title: string = 'title';
    names: Name[] = [];
    currentUser: Subject<User>;
    keyups: Observable<any>;
    jobsQuote: Quote;
    quotes: QueryList<QuoteComponent>;
    showOldTests = false;

    constructor(private appService: AppService,
                private el: ElementRef,
                @Query(QuoteComponent) quotes: QueryList<QuoteComponent>) {

        this.appService.currentUser.subscribe((user: User) => console.log(user));
        this.currentUser = appService.currentUser;

        //console.log(el);
        //this.keyups = Observable.fromEvent(this.el.nativeElement, 'keyup').map(e => e.target.value);

        this.jobsQuote = new Quote("Steve Jobs", "Quality is much better than quantity. One home run is much better than two doubles.");

        //console.log('quote', quotes.toArray());
        this.quotes = quotes;
    }

    ngAfterContentInit() {
        //console.log('quote after', this.quotes.toArray());
    }

    add(text: HTMLInputElement) {
        this.names.push({value: text.value});
        this.appService.setCurrentUser({name: text.value});

        text.value = '';
    }

    log(message: string) {
        console.log(message);
    }

    getName(user: User){
        return user ? user.name : '';
    }

}