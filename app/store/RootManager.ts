import {PerfUtils} from "../redux/PerfUtils";
import {ReduxTestData} from "./AppState";
import {ReduxTestsActions} from "../redux/ReduxTestActions";
import {AppState} from "./AppState";

export class RootManager {

    [ReduxTestsActions.INIT_COUNTER] (state: AppState) {
        state.reduxTest.clicksCount = 0;
        state.reduxTest.someData = { id: 10 };
        state.reduxTest.initialized = true;
    }

    [ReduxTestsActions.INCREMENT] (state: AppState) {
        state.reduxTest.clicksCount++;
        delete state.reduxTest.name;
        state.reduxTest.justVal = true;
    }

    [ReduxTestsActions.ADD_NUM] (state: AppState, action) {
        state.reduxTest.clicksCount += action.num;
    }

    [ReduxTestsActions.INIT_PERF] (state: AppState) {
        state.reduxTest.perf = PerfUtils.generateBigState();
    }

}