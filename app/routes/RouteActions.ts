import {Injectable, Inject, forwardRef} from '@angular/core';
import {ActionTypeCreator} from "../store/actions/ActionTypeCreator";
import {AppRoute} from "./AppRoute";
import {ActionCreator} from "../store/actions/ActionCreator";
import {Store} from "../store/Store";

@Injectable()
export class RouteActions extends ActionCreator {
    private static typeCreator = new ActionTypeCreator('ROUTE');

    static CHANGE_ROUTE = RouteActions.typeCreator.type('CHANGE_ROUTE');

    constructor(@Inject(forwardRef(() => Store)) store: Store){
        super(store);
    }

    changeRoute(nextRoute: AppRoute) {
        this.dispatch(RouteActions.CHANGE_ROUTE, nextRoute);
    }
}