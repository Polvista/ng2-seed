import { Component, ChangeDetectionStrategy, AfterContentChecked, Inject, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable, Subscription } from 'rxjs';
import { Action } from 'redux';
import { AppState } from "../store/AppState";
import { Store } from "../store/Store";
import {ReduxTestsActions} from "./ReduxTestActions";
import {SomeData} from "../store/AppState";
import {ReduxTestData} from "../store/AppState";
import {ReduxTestSelectors} from "./ReduxTestSelectors";
import {AppRoute} from "../routes/AppRoute";
import {RouterService} from "../routes/RouterService";
import {NextRoute} from "../routes/RouterService";

@Component({
    selector: 'redux-test',
    template: `
        <div class="redux-greetings">redux test here</div>
        <div>Clicks: {{clicksCount | async}} <button (click)="onClick()">click</button> <button (click)="add(5)">add five</button>
        </div>
        <div>{{ someData | async | json}}</div><button (click)="initPerf()">Init perf</button>

        <div>Array: {{ someArray | async | json }}</div>
        <button (click)="changeArray()">Array change</button>
        <button (click)="actions.clearPayload(11)">Clear payload in item</button>
        <button (click)="changeItem()">Change item</button>
        <button (click)="changePayload()">Change payload</button>

        <div>Derived data: {{ clicksAndIds | async }}</div>

        <div>Checked: {{getTime()}}</div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReduxTestsActions],
    styleUrls: ['reduxTest.scss']
})
export class ReduxTestComponent implements OnDestroy, OnInit {

    @select(ReduxTestSelectors.clicksCount)
    clicksCount: Observable<number>;

    @select(ReduxTestSelectors.someData)
    someData: Observable<SomeData>;

    @select(ReduxTestSelectors.clicksAndIds)
    clicksAndIds: Observable<number>;

    @select(ReduxTestSelectors.someArray)
    someArray: Observable<SomeData[]>;

    routeSubscription: Subscription;

    constructor(
        private store: Store,
        private actions: ReduxTestsActions,
        private routerService: RouterService) {

        this.actions.init();

        this.routeSubscription = this.routerService.routeChanges.subscribe(this.actions.clear);
    }

    ngOnInit() {
        /*this.routeSubscription = this.store.select('route').subscribe((route: AppRoute) => {
            console.log(route);

            /!*if(!route.prevRoute || route.prevRoute.url != route.url) {
                this.actions.clear();
            }*!/
        });*/
    }


    onClick = this.actions.increment;

    add = (num: number) => this.actions.addNum(num);

    initPerf = this.actions.initPerf;

    changeArray = () => this.actions.setPayload(11, { s: 'ss' });

    changeItem = () => this.actions.changeItem(11);

    changePayload = () => this.actions.changePayload(11);

    getTime() {
        return new Date().toString();
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
        //this.actions.clear();
    }
}