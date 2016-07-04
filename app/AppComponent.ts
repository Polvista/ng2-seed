/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/custom.d.ts" />

import { Component, ElementRef, AfterContentInit, ApplicationRef, OnDestroy } from "@angular/core";
import { ROUTER_DIRECTIVES, ActivatedRoute, Router, Event, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import {ReduxTestComponent} from "./redux/ReduxTestComponent";
import {AppState} from "./store/AppState";
import {Store} from "./store/Store";
import {ImmutableWithMutations} from "./immutable/withMutations/ImmutableWithMutations";
import {RoutesHelper} from "./routes/RoutesHelper";
import {RouteActions} from "./routes/RouteActions";


@Component({
    selector: 'app',
    template: `

        Hello

        <a [routerLink]="['/about', 3]">show about</a>
        <a [routerLink]="['/']">show tests</a>

        <router-outlet></router-outlet>

        <immutable-with-mutations>
        </immutable-with-mutations>
    `,
    directives: [ROUTER_DIRECTIVES, ImmutableWithMutations],
    providers: [Store, RouteActions]
})
export class App implements AfterContentInit, OnDestroy {
    constructor(private store: Store,
                private router: Router,
                routeActions: RouteActions) {

        this.router.events.subscribe((event: Event) => {
            //TODO add rxjs filter
            if(event instanceof NavigationEnd) {
                routeActions.changeRoute(RoutesHelper.getCurrentAppRoute(this.router.routerState.snapshot));
            }
        })
    }

    ngAfterContentInit() {
    }

    ngOnDestroy() {
    }

}
