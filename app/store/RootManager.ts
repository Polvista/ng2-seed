import {PerfUtils} from "../redux/PerfUtils";
import {ReduxTestData} from "./AppState";
import {ReduxTestsActions} from "../redux/ReduxTestActions";
import {AppState} from "./AppState";
import { StateManager } from "./StateManager";
import {ReduxTestManager} from "../redux/ReduxTestManager";

export class RootManager {

    @StateManager('reduxTest')
    reduxManager = new ReduxTestManager();

}