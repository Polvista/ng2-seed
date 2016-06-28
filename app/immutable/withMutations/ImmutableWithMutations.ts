import { Component, Inject } from '@angular/core';
import {Store} from "../../store/Store";

@Component({
    selector: 'immutable-with-mutations',
    template: `
        <button (click)="changeDetection()">Start change detection</button>
    `
})
export class ImmutableWithMutations {

    constructor(private store: Store){}

    changeDetection() {
        this.store.dispatch({type: 'NONE'});
    }

}