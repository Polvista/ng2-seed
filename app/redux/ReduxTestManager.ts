import {ReduxTestsActions} from "./ReduxTestActions";
import {ReduxTestData} from "../store/AppState";
import {PerfUtils} from "./PerfUtils";


export class ReduxTestManager {

    initialValue: ReduxTestData = {
        clicksCount: 0
    };

    [ReduxTestsActions.INCREMENT] (reduxTestData: ReduxTestData) {
        reduxTestData.clicksCount++;
        delete reduxTestData.name;
        reduxTestData.justVal = true;
    }

    [ReduxTestsActions.ADD_NUM] (reduxTestData: ReduxTestData, action) {
        reduxTestData.clicksCount += action.num;
    }

    [ReduxTestsActions.INIT_PERF] (reduxTestData: ReduxTestData) {
        reduxTestData.perf = PerfUtils.generateBigState();
    }

}
