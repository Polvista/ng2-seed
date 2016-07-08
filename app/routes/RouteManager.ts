import {action, useReturnValue} from "../store/managers/OnAction";
import {RouteActions} from "./RouteActions";
import {AppRoute} from "./AppRoute";

export class RouteManager {

    @useReturnValue()
    @action(RouteActions.CHANGE_ROUTE)
    changeRoute(currentRoute: AppRoute, nextRoute: AppRoute) {
        if(currentRoute) {
            currentRoute.prevRoute = null;
            nextRoute.prevRoute = currentRoute;
        }

        return nextRoute;
    }

}