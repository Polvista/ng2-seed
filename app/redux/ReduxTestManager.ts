import {ReduxTestsActions} from "./ReduxTestActions";
import {ReduxTestData} from "../store/AppState";
import {PerfUtils} from "./PerfUtils";
import {AppState} from "../store/AppState";


export class ReduxTestManager {

    [ReduxTestsActions.INIT_COUNTER] (reduxTest: ReduxTestData) {
        reduxTest.clicksCount = 0;
        reduxTest.someData = { id: 10 };
        reduxTest.initialized = true;
    }

    [ReduxTestsActions.INCREMENT] (reduxTest: ReduxTestData) {
        reduxTest.clicksCount++;
        delete reduxTest.name;
        reduxTest.justVal = true;
    }

    [ReduxTestsActions.ADD_NUM] (reduxTest: ReduxTestData, action) {
        reduxTest.clicksCount += action.num;
    }

    [ReduxTestsActions.INIT_PERF] (reduxTest: ReduxTestData) {
        reduxTest.perf = PerfUtils.generateBigState();
    }

}
