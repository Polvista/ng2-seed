import { Component, Inject } from '@angular/core';
import {Store} from "../../store/Store";
import {ReduxTestsActions} from "../../redux/ReduxTestActions";

@Component({
    selector: 'immutable-with-mutations',
    template: `
        <button (click)="changeDetection()">Start change detection</button>
    `
})
export class ImmutableWithMutations {

    constructor(@Inject('Store') private store: Store){}

    changeDetection() {
        console.log('aa');
        this.store.dispatch({type: 'NONE'});
    }

}