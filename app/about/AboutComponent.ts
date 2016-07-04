import { Component, Inject } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import {Store} from "../store/Store";

@Component({
    selector: 'about',
    template: `
        <h3>About us</h3>
        <p>We are cool</p>
    `
})
export class AboutComponent {

    constructor(private store: Store){}

    changeDetection() {
        this.store.dispatch({type: 'NONE'});
    }

}