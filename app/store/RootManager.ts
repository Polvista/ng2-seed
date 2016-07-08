import {PerfUtils} from "../redux/PerfUtils";
import {ReduxTestData} from "./AppState";
import {ReduxTestsActions} from "../redux/ReduxTestActions";
import {AppState} from "./AppState";
import { StateManager } from "./managers/StateManager";
import {ReduxTestManager} from "../redux/ReduxTestManager";
import {RouteManager} from "../routes/RouteManager";

export class RootManager {

    @StateManager('reduxTest')
    reduxManager = new ReduxTestManager();

    @StateManager('route')
    routeManager = new RouteManager();

}