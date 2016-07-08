import {PerfUtils} from "../redux/PerfUtils";
import {ReduxTestData} from "./AppState";
import {ReduxTestsActions} from "../redux/ReduxTestActions";
import {AppState} from "./AppState";
import { stateManager } from "./managers/StateManager";
import {ReduxTestManager} from "../redux/ReduxTestManager";
import {RouteManager} from "../routes/RouteManager";

export class RootManager {

    @stateManager('reduxTest')
    reduxManager = new ReduxTestManager();

    @stateManager('route')
    routeManager = new RouteManager();

}