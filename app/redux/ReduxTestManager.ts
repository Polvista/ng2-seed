import {ReduxTestsActions} from "./ReduxTestActions";
import {ReduxTestData} from "../store/AppState";
import {PerfUtils} from "./PerfUtils";
import {AppState} from "../store/AppState";
import {OnAction, UseReturnValue} from "../store/OnAction";


export class ReduxTestManager {

    @UseReturnValue()
    @OnAction(ReduxTestsActions.INIT_COUNTER)
    init() {
        return {
            clicksCount: 0,
            someData: { id: 10 },
            initialized: true
        }
    }

    @OnAction(ReduxTestsActions.INCREMENT)
    increment(reduxTest: ReduxTestData) {
        reduxTest.clicksCount++;
        delete reduxTest.name;
        reduxTest.justVal = true;
    }

    @OnAction(ReduxTestsActions.ADD_NUM)
    addNum(reduxTest: ReduxTestData, action) {
        reduxTest.clicksCount += action.num;
    }

    @OnAction(ReduxTestsActions.INIT_PERF)
    initPerf(reduxTest: ReduxTestData) {
        reduxTest.perf = PerfUtils.generateBigState();
    }

}
