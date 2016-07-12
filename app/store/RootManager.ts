import {PerfUtils} from "../redux/PerfUtils";
import {ReduxTestData} from "./AppState";
import {ReduxTestsActions} from "../redux/ReduxTestActions";
import {AppState} from "./AppState";
import { manager } from "./managers/manager";
import {ReduxTestManager} from "../redux/ReduxTestManager";
import {RouteManager} from "../routes/RouteManager";

export class RootManager {

    @manager('reduxTest')
    reduxManager = new ReduxTestManager();

    @manager('route')
    routeManager = new RouteManager();

}