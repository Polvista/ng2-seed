import {ReduxTestsActions} from "./ReduxTestActions";
import {ReduxTestData} from "../store/AppState";
import {PerfUtils} from "./PerfUtils";
import {AppState} from "../store/AppState";
import {OnAction, UseReturnValue} from "../store/managers/OnAction";
import { ArrayItemManager } from "../store/managers/ArrayItemManager";
import {SomeData} from "../store/AppState";
import {SomeDataManager} from "./SomeDataManager";

export class ReduxTestManager {

    @ArrayItemManager('someArray', (item: SomeData, { id }) => item.id == id)
    someArrayManager = new SomeDataManager();

    @UseReturnValue()
    @OnAction(ReduxTestsActions.INIT_COUNTER)
    init() {
        return {
            clicksCount: 0,
            someData: { id: 10 },
            someArray: [ { id: 11 }, { id: 12}, { id: 13 } ]
        }
    }

    @OnAction(ReduxTestsActions.INCREMENT)
    increment(reduxTest: ReduxTestData) {
        reduxTest.clicksCount++;
        //delete reduxTest.name;
        //reduxTest.justVal = true;

        reduxTest.someArray.push({ id: reduxTest.clicksCount });

    }

    @OnAction(ReduxTestsActions.ADD_NUM)
    addNum(reduxTest: ReduxTestData, num: number) {
        reduxTest.clicksCount += num;
    }

    @OnAction(ReduxTestsActions.INIT_PERF)
    initPerf(reduxTest: ReduxTestData) {
        reduxTest.perf = PerfUtils.generateBigState();
    }

    @UseReturnValue()
    @OnAction(ReduxTestsActions.CLEAR)
    clear() {
        return null;
    }

}
