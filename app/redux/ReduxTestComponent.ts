import { Component, ChangeDetectionStrategy, AfterContentChecked, Inject, forwardRef, OnDestroy } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { AppState } from "../store/AppState";
import { Store } from "../store/Store";
import {ReduxTestsActions} from "./ReduxTestActions";
import {SomeData} from "../store/AppState";
import {ReduxTestData} from "../store/AppState";
import {ReduxTestSelectors} from "./ReduxTestSelectors";

@Component({
    selector: 'redux-test',
    template: `
        <div class="redux-greetings">redux test here</div>
        <div>Clicks: {{clicksCount | async}} <button (click)="onClick()">click</button> <button (click)="add(5)">add five</button>
        </div>
        <div>{{ someData | async | json}}</div><button (click)="initPerf()">Init perf</button>

        <div>Array: {{ someArray | async | json }}</div>

        <div>Derived data: {{ clicksAndIds | async }}</div>

        <div>Checked: {{getTime()}}</div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReduxTestsActions],
    styleUrls: ['reduxTest.scss']
})
export class ReduxTestComponent implements OnDestroy {

    @select(ReduxTestSelectors.clicksCount)
    clicksCount: Observable<number>;

    @select(ReduxTestSelectors.someData)
    someData: Observable<SomeData>;

    @select(ReduxTestSelectors.clicksAndIds)
    clicksAndIds: Observable<number>;

    @select(ReduxTestSelectors.someArray)
    someArray: Observable<SomeData[]>;

    constructor(
        private store: Store,
        private actions: ReduxTestsActions) {

        this.actions.init();
    }

    onClick() {
        this.actions.increment();
    }

    add(num: number) {
        this.actions.addNum(num);
    }

    initPerf() {
        this.actions.initPerf();
    }

    getTime() {
        return new Date().toString();
    }

    ngOnDestroy() {
        this.actions.clear();
    }
}