import { AppState } from "../store/AppState";
import { selector } from '../store/selector';
import {SomeData} from "../store/AppState";

export class ReduxTestSelectors {

    static clicksCount = (state: AppState) => state.reduxTest.clicksCount;

    static someData = (state: AppState) => state.reduxTest.someData;

    static clicksAndIds = selector<number>(
        ReduxTestSelectors.clicksCount,
        ReduxTestSelectors.someData,
        (clicksCount, someData: SomeData) => clicksCount + someData.id
    );

}