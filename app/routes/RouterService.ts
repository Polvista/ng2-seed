import { Injectable, forwardRef, Inject } from "@angular/core";
import { Router, NavigationStart, Event } from "@angular/router";
import { Observable, Subject } from "rxjs";
import {Store} from "../store/Store";
import {AppRoute} from "./AppRoute";
import {RoutesHelper} from "./RoutesHelper";

export interface NextRoute {
    url: string;
}

@Injectable()
export class RouterService {

    routeChanges: Subject<NextRoute> = new Subject<NextRoute>();

    constructor(@Inject(forwardRef(() => Router)) private router: Router,
                @Inject(forwardRef(() => Store)) private store: Store) {


        this.router.events.subscribe((event: Event) => {
            //TODO add rxjs filter
            if(event instanceof NavigationStart) {
                const currentRoute: AppRoute = store.getState().route;

                if(currentRoute && currentRoute.url != event.url) {
                    this.routeChanges.next({ url: event.url });
                }
            }
        })
    }




}