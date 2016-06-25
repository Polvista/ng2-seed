import { Component, ChangeDetectionStrategy, AfterContentChecked, Inject, forwardRef } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { AppState } from "../store/AppState";
import { Store } from "../store/Store";
import {ReduxTestsActions} from "./ReduxTestActions";
import {SomeData} from "../store/AppState";
import {AppService} from "../AppService";

@Component({
    selector: 'redux-test',
    template: `
        <div>redux test here!</div>
        <div>Clicks: {{clicksCount | async}} <button (click)="onClick()">click</button> <button (click)="add(5)">add five</button>
        </div>
        <div>{{ someData | async | json}}</div><button (click)="initPerf()">Init perf</button>

        <div>Checked: {{getTime()}}</div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReduxTestsActions]
})
export class ReduxTestComponent {

    @select()
    clicksCount: Observable<number>;

    @select()
    someData: Observable<SomeData>;

    constructor(
        private store: Store,
        private actions: ReduxTestsActions) {
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
}