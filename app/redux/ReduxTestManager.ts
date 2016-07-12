import {ReduxTestsActions} from "./ReduxTestActions";
import {ReduxTestData} from "../store/AppState";
import {PerfUtils} from "./PerfUtils";
import {AppState} from "../store/AppState";
import {action, useReturnValue} from "../store/managers/action";
import { arrayItemManager } from "../store/managers/arrayItemManager";
import {SomeData} from "../store/AppState";
import {SomeDataManager} from "./SomeDataManager";

export class ReduxTestManager {

    @arrayItemManager('someArray', (item: SomeData, { id }) => item.id == id)
    someArrayManager = new SomeDataManager();

    @useReturnValue
    @action(ReduxTestsActions.INIT_COUNTER)
    init() {
        return {
            clicksCount: 0,
            someData: { id: 10 },
            someArray: [ { id: 11 }, { id: 12}, { id: 13 } ]
        }
    }

    @action(ReduxTestsActions.INCREMENT)
    increment(reduxTest: ReduxTestData) {
        reduxTest.clicksCount++;
        //delete reduxTest.name;
        //reduxTest.justVal = true;

        reduxTest.someArray.push({ id: reduxTest.clicksCount });

    }

    @action(ReduxTestsActions.ADD_NUM)
    addNum(reduxTest: ReduxTestData, num: number) {
        reduxTest.clicksCount += num;
    }

    @action(ReduxTestsActions.INIT_PERF)
    initPerf(reduxTest: ReduxTestData) {
        reduxTest.perf = PerfUtils.generateBigState();
    }

    @useReturnValue
    @action(ReduxTestsActions.CLEAR)
    clear() {
        return null;
    }

}
