/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/custom.d.ts" />

import { Component, ElementRef, AfterContentInit, ApplicationRef, OnDestroy, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES, ActivatedRoute, Router, Event, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { select } from 'ng2-redux';
import { Observable } from "rxjs";
import {ReduxTestComponent} from "./redux/ReduxTestComponent";
import {AppState} from "./store/AppState";
import {Store} from "./store/Store";
import {ImmutableWithMutations} from "./immutable/withMutations/ImmutableWithMutations";
import {RoutesHelper} from "./routes/RoutesHelper";
import {RouteActions} from "./routes/RouteActions";
import {AppRoute} from "./routes/AppRoute";
import {RouterService} from "./routes/RouterService";


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
    providers: [Store, RouteActions, RouterService]
})
export class App implements AfterContentInit, OnDestroy, OnInit {

    @select()
    route: Observable<AppRoute>;

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

    ngOnInit() {

        //Synchronize route with state
        this.route.subscribe((route: AppRoute) => {
            if(route && this.router.url != route.url) {
                this.router.navigateByUrl(route.url);
            }
        });
    }

    ngAfterContentInit() {
    }

    ngOnDestroy() {
    }

}
