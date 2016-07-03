import { AppState } from "../store/AppState";
import { selector, nullSafeSelector, nullSafe } from '../store/selector';
import {SomeData} from "../store/AppState";
import {ReduxTestData} from "../store/AppState";

export class ReduxTestSelectors {

    static reduxTest = (state: AppState) => state.reduxTest;

    static clicksCount = nullSafeSelector<number>(
        ReduxTestSelectors.reduxTest,
        (reduxTest: ReduxTestData) => reduxTest.clicksCount
    );

    static someData = nullSafeSelector<SomeData>(
        ReduxTestSelectors.reduxTest,
        (reduxTest: ReduxTestData) => reduxTest.someData
    );

    static clicksAndIds = nullSafeSelector<number>(
        ReduxTestSelectors.clicksCount,
        ReduxTestSelectors.someData,
        (clicksCount, someData: SomeData) => clicksCount + someData.id
    );

}