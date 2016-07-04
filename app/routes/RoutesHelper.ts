import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AppRoute } from "./AppRoute";

export class RoutesHelper {

    static getCurrentAppRoute(routerStateSnapshot: RouterStateSnapshot): AppRoute {
        return {
            url: routerStateSnapshot.url,
            params: RoutesHelper.mergeRouteParams(routerStateSnapshot, routerStateSnapshot.root),
            queryParams: Object.assign({}, routerStateSnapshot.queryParams)
        };
    }

    private static mergeRouteParams(routerStateSnapshot: RouterStateSnapshot, routeSnapshot: ActivatedRouteSnapshot) {
        let params = Object.assign({}, routeSnapshot.params);

        routerStateSnapshot.children(routeSnapshot).forEach((childRouteSnapshot: ActivatedRouteSnapshot) => {
            Object.assign(params, RoutesHelper.mergeRouteParams(routerStateSnapshot, childRouteSnapshot));
        });

        return params;
    }

}