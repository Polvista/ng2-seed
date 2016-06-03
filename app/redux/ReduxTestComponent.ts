import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { AppState } from "../store/AppState";

@Component({
    selector: 'redux-test',
    template: `
        <div>redux test here!</div>
        <div>Clicks: {{clicksCount | async}} <button (click)="onClick()">click</button></div>
    `
})
export class ReduxTestComponent {
    clicksCount: Observable<number>;

    constructor(private ngRedux: NgRedux<AppState>){
        this.clicksCount = <Observable<number>> ngRedux.select('clicksCount');
    }

    onClick() {
        const action: Action = {type: 'INCREMENT'};
        this.ngRedux.dispatch(<any> action);
    }
}