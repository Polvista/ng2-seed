import { Component, ChangeDetectionStrategy, AfterContentChecked } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { AppState } from "../store/AppState";
import { Store } from "../store/Store";
import {ReduxTestsActions} from "./ReduxTestActions";
import {SomeData} from "../store/AppState";

@Component({
    selector: 'redux-test',
    template: `
        <div>redux test here!</div>
        <div>Clicks: {{clicksCount | async}} <button (click)="onClick()">click</button> <button (click)="add(5)">add five</button>
        </div>
        <div>{{ someData | async }}</div><button (click)="initPerf()">Init perf</button>
    `
})
export class ReduxTestComponent {
    clicksCount: Observable<number>;
    someData: Observable<SomeData>;

    constructor(private store: Store){
        this.clicksCount = this.store.select('clicksCount');
        this.someData = this.store.select('someData');
    }

    onClick() {
        this.store.dispatch(ReduxTestsActions.increment());
    }

    add(num: number) {
        this.store.dispatch({type: 'ADD', num});
    }

    initPerf() {
        this.store.dispatch(ReduxTestsActions.initPerf());
    }
}