import { Component, ChangeDetectionStrategy, AfterContentChecked } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { AppState } from "../store/AppState";
import { Store } from "../store/Store";
import {ReduxTestsActions} from "./ReduxTestActions";

@Component({
    selector: 'redux-test',
    template: `
        <div>redux test here!</div>
        <div>Clicks: {{clicksCount | async}} <button (click)="onClick()">click</button> <button (click)="add(5)">add five</button>
        </div>
    `
})
export class ReduxTestComponent {
    clicksCount: Observable<number>;

    constructor(private store: Store){
        this.clicksCount = this.store.select('clicksCount');
    }

    onClick() {
        this.store.dispatch(ReduxTestsActions.increment());
    }

    add(num: number) {
        this.store.dispatch({type: 'ADD', num});
    }
}