import { Component } from '@angular/core';
import {Store} from "../../store/Store";
import {ReduxTestsActions} from "../../redux/ReduxTestActions";

@Component({
    selector: 'immutable-with-mutations',
    template: `
        <button (click)="changeDetection()">Start change detection</button>
    `
})
export class ImmutableWithMutations {

    constructor(private store: Store){}

    changeDetection() {
        console.log('aa');
        this.store.dispatch(ReduxTestsActions.increment());
    }

}