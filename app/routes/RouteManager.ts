import {OnAction, UseReturnValue} from "../store/OnAction";
import {RouteActions} from "./RouteActions";
import {AppRoute} from "./AppRoute";

export class RouteManager {

    @UseReturnValue()
    @OnAction(RouteActions.CHANGE_ROUTE)
    changeRoute(currentRoute: AppRoute, nextRoute: AppRoute) {
        return nextRoute;
    }

}