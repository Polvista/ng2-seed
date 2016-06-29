import { AppState } from "../store/AppState";
import { selector } from '../store/selector';

export class ReduxTestSelectors {

    static clicksCount = (state: AppState) => state.reduxTest.clicksCount;

    static someData = (state: AppState) => state.reduxTest.someData;

    static clicksAndIds = selector<number>(
        ReduxTestSelectors.clicksCount,
        (state: AppState) => state.reduxTest.someData.id,
        (clicksCount, id) => clicksCount + id
    );

}